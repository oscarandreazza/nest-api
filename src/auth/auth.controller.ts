import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from 'src/user/interfaces/user.entity';
import { AuthDto } from './dtos/Auth.dto';
import { AuthService } from './auth.service';
import { ReturnAuthDto } from './dtos/ReturnAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() authDto: AuthDto): Promise<ReturnAuthDto> {
    const user = await this.authService.signIn(authDto);

    return new ReturnAuthDto(user.id, user.name, user.email);
  }
}
