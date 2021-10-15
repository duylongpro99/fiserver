import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const _createUserDto = new CreateUserDto();
    _createUserDto.email = createUserDto.email;
    _createUserDto.userName = createUserDto.userName;
    _createUserDto.password = createUserDto.password;
    _createUserDto.firstName = createUserDto.firstName;
    _createUserDto.lastName = createUserDto.lastName;
    const user = _createUserDto.toEntity();
    return this.userRepo.save(user);
  }

  async showById(id: string): Promise<User | undefined> {
    const user = await this.findById(id);
    if (user) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepo.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByUsername(userName: string): Promise<User | null> {
    return await this.userRepo.findOne({
      userName: Raw((alias) => `LOWER(${alias}) = LOWER(:userName)`, {
        userName: userName,
      }),
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
