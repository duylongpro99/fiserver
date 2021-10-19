import { RefreshRequest } from './request/refreshRequest';
import { Message } from './../../Constant/Message';
import { UsersService } from './../users/users.service';
import { TokensService } from './../../entity/refreshToken/token.service';
import { RegisterRequest } from './request/registerRequest';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/loginRequest';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    token: string;
    refreshToken?: string;
  };
}

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
    private readonly userService: UsersService,
  ) {}

  private buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refreshToken } : {}),
      },
    };
  }

  @Post('/register')
  async regster(@Body() register: RegisterRequest) {
    const user = await this.authService.createUserFromRequest(register);
    const token = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 7,
    );

    const payload = this.buildResponsePayload(user, token, refreshToken);
    return {
      status: 'success',
      data: payload,
    };
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    const { userName, password } = loginRequest;
    const user = await this.userService.findByUsername(userName);
    const isValid = user
      ? await this.authService.validateCredentials(user, password)
      : false;

    if (!isValid) {
      throw new UnprocessableEntityException(
        Message.LoginMessage.LoginIsInValid,
      );
    }
    const token = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 7,
    );

    const payload = this.buildResponsePayload(user, token, refreshToken);
    return {
      status: 'success',
      data: payload,
    };
  }

  @Post('/refresh')
  async refresh(@Body() refreshRequest: RefreshRequest) {
    const { user, token } =
      await this.tokenService.createAccessTokenFromRefreshToken(
        refreshRequest.refreshToken,
      );
    const payload = this.buildResponsePayload(user, token);
    return {
      status: 'success',
      data: payload,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request) {
    const userId = request.user.id;
    const user = await this.userService.findById(userId);
    return {
      status: 'success',
      data: user,
    };
  }
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
