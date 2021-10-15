import { Message } from '../../../Constant/Message';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: Message.LoginMessage.UserNameIsRequired,
  })
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: Message.LoginMessage.PasswordIsRequired,
  })
  readonly password: string;
}
