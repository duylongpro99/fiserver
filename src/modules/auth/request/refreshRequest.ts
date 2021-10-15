import { Message } from './../../../Constant/Message';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: Message.TokenMessage.RefreshTokenIsRequired,
  })
  readonly refreshToken: string;
}
