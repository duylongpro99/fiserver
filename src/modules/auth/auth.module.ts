import { RefreshTokens } from './../../entity/refreshToken/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokensService } from '../../entity/refreshToken/token.service';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        signOptions: {
          expiresIn: process.env.EXPIRES_IN,
        },
        secretOrPrivateKey: process.env.JWT_SECRET,
      }),
    }),
    TypeOrmModule.forFeature([RefreshTokens]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, JwtAuthGuard],
})
export class AuthModule {}
