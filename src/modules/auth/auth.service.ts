import { Message } from './../../Constant/Message';
import { RegisterRequest } from './request/registerRequest';
import { User } from './../users/entities/user.entity';
import { TokensService } from '../../entity/refreshToken/token.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { SignOptions } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly rTokenService: TokensService,
  ) {}

  // private jwtService: JwtService,

  // async login(authLoginDto: AuthLoginDto) {
  //   const user = await this.validateUser(authLoginDto);
  //   const payload = {
  //     userId: user.id,
  //   };
  //   return {
  //     acess_token: this.jwtService.sign(payload),
  //   };
  // }

  // async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
  //   const { email, password } = authLoginDto;
  //   const user = await this.usersService.findByEmail(email);
  //   if (!(await user?.validatePassword(password))) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async validateCredentials(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  async createUserFromRequest(request: RegisterRequest): Promise<User> {
    const { userName, password, email } = request;
    const existingFromUsername = await this.usersService.findByUsername(
      userName,
    );
    if (existingFromUsername) {
      throw new UnprocessableEntityException(
        Message.LoginMessage.UserNameInUse,
      );
    }
    const createUserDto = new CreateUserDto();
    createUserDto.userName = request.userName;
    createUserDto.password = request.password;
    createUserDto.email = request.email;
    createUserDto.firstName = request.firstName;
    createUserDto.lastName = request.lastName;
    try {
      return this.usersService.create(createUserDto);
    } catch (e) {
      throw new UnprocessableEntityException(
        Message.LoginMessage.CannotRegsiter,
      );
    }
  }
}
