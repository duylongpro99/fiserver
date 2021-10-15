import { Message } from './../../Constant/Message';
import { UsersService } from './../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokens } from './refresh-token.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

const BASE_OPTIONS: SignOptions = {
  issuer: '',
  audience: '',
};

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(RefreshTokens)
    private readonly refreshTokensRepo: Repository<RefreshTokens>,
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
  ) {}

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException(
          Message.TokenMessage.TokenIsExpried,
        );
      } else {
        throw new UnprocessableEntityException(
          Message.TokenMessage.RefreshTokenMalformed,
        );
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;
    if (!subId) {
      throw new UnprocessableEntityException(
        Message.TokenMessage.RefreshTokenMalformed,
      );
    }
    return await this.userService.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokens | null> {
    const tokenId = payload.jti;
    if (!tokenId) {
      throw new UnprocessableEntityException(
        Message.TokenMessage.RefreshTokenMalformed,
      );
    }
    return await this.findRefreshTokenById(tokenId);
  }

  async createRefreshToken(user: User, ttl: number): Promise<RefreshTokens> {
    const token = new RefreshTokens();
    token.userId = user.id;
    token.isRevoked = false;
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);
    token.expires = expiration;
    return this.refreshTokensRepo.save(token);
  }

  async findRefreshTokenById(id: string): Promise<RefreshTokens | null> {
    return this.refreshTokensRepo.findOne({
      where: {
        id,
      },
    });
  }

  async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };

    return this.jwt.signAsync({}, opts);
  }

  async generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const rToken = await this.createRefreshToken(user, expiresIn);
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
      jwtid: String(rToken.id),
    };
    return this.jwt.signAsync({}, opts);
  }

  async resolveRefreshToken(encoded: string): Promise<{
    user: User;
    token: RefreshTokens;
  }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
    if (!token) {
      throw new UnprocessableEntityException(
        Message.TokenMessage.RefreshTokenNotFounded,
      );
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException(
        Message.TokenMessage.RefreshTokenIsRevoked,
      );
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);
    if (!user) {
      throw new UnprocessableEntityException(
        Message.TokenMessage.RefreshTokenMalformed,
      );
    }

    return { user, token };
  }

  async createAccessTokenFromRefreshToken(refresh: string): Promise<{
    user: User;
    token: string;
  }> {
    const { user } = await this.resolveRefreshToken(refresh);
    const token = await this.generateAccessToken(user);
    return { user, token };
  }
}
