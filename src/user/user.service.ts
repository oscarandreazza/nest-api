import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async userCreate(userCreate: UserCreateDto): Promise<UserEntity> {
    const hashedPassword = await hash(userCreate.password, 10);

    return this.userRepository.save({
      ...userCreate,
      password: hashedPassword,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    return user;
  }
}
