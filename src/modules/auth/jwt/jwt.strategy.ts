import { UsersService } from './../../users/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface AccessTokenPayload {
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private readonly userRepo: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7,
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;
    const user = await this.userRepo.findById(id);

    if (!user) {
      return null;
    }
    return user;
  }
  // constructor() {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     ignoreExpiration: false,
  //     secretOrkey: process.env.JWT_SECRET,
  //   });
  // }

  // async validate(payload: { userId: number }) {
  //   return {
  //     userId: payload.userId,
  //   };
  // }
}
