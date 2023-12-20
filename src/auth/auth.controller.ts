import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dtos/Auth.dto';
import { AuthService } from './auth.service';
import { ReturnAuth } from './dtos/returnAuth';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() authDto: AuthDto): Promise<ReturnAuth> {
    return await this.authService.signIn(authDto);
  }
}
