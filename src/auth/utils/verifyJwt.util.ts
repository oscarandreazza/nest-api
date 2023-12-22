import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../dtos/loginPayload.dts';

export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(authorizationHeader: string): Promise<LoginPayload | any> {
    try {
      const loginPayload: LoginPayload | null = await this.jwtService.verifyAsync(authorizationHeader, {
        secret: process.env.JWT_SECRET,
      });
      return loginPayload;
    } catch (error) {
      return error;
      return null;
    }
  }
}
