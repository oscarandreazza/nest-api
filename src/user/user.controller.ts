import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async userCreate(@Body() userCreate: UserCreateDto): Promise<ReturnUserDto> {
    const user = await this.userService.userCreate(userCreate);

    return new ReturnUserDto(user);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map((UserEntity) => {
      return new ReturnUserDto(UserEntity);
    });
  }
}
