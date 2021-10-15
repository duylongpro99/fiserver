import { User } from './../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  public toEntity(): User {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    user.lastName = this.lastName ? this.lastName : '';
    user.firstName = this.firstName ? this.firstName : '';
    user.userName = this.userName;
    user.isActive = true;
    user.isArchived = false;
    user.createdBy = '';
    user.lastChangedBy = '';
    return user;
  }
}
