import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Post()
  async userCreate(@Body() userCreate: UserCreateDto): Promise<UserEntity> {
    return this.userService.userCreate(userCreate);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map((UserEntity) => {
      return new ReturnUserDto(UserEntity);
    });
  }
}
