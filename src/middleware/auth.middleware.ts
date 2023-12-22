import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dts';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      return next();
    }

    const loginPayload: LoginPayload | null = await this.jwtService.verifyAsync(authorizationHeader, {
      secret: process.env.JWT_SECRET,
    });

    if (!loginPayload) {
      return next();
    }

    req['id'] = loginPayload.id;
    next();
  }
}
