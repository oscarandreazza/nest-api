import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dtos/Auth.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/interfaces/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signIn(authDto: AuthDto): Promise<UserEntity> {
    let user: UserEntity = await this.userService
      .getUserByEmail(authDto.email)
      .catch((e) => undefined);

    const passwordIsMatch = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (!user || !passwordIsMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return user;
  }
}
