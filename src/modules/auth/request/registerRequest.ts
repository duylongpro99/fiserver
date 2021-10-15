import { Message } from './../../../Constant/Message';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: Message.LoginMessage.UserNameIsRequired,
  })
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: Message.LoginMessage.PasswordIsRequired,
  })
  @MinLength(6, {
    message: Message.LoginMessage.PasswordRequiredCharacters,
  })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: Message.LoginMessage.EmailIsRequired,
  })
  @IsEmail(
    {},
    {
      message: Message.LoginMessage.EmailIsInvalid,
    },
  )
  readonly email: string;

  @IsString()
  readonly lastName;

  @IsString()
  readonly firstName;
}
