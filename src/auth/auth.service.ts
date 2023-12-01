import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dtos/Auth.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { ReturnAuth } from './dtos/returnAuth';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './dtos/loginPayload.dts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(authDto: AuthDto): Promise<ReturnAuth> {
    let user: UserEntity = await this.userService.getUserByEmail(authDto.email).catch((e) => undefined);

    const passwordIsMatch = await bcrypt.compare(authDto.password, user.password);

    if (!user || !passwordIsMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
