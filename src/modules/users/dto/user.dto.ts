import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { BaseEntity } from 'src/entity/base.entity';

export class UserDto extends BaseEntity {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  userName: string;
}
