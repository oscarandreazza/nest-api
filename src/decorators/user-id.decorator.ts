import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dts';

export const UserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (request) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      // Cabeçalho de autorização não presente, retorne null ou algum valor padrão
      return null;
    }

    const jwtService = new JwtService();
    try {
      const loginPayload: LoginPayload = await jwtService.verifyAsync(authorizationHeader, {
        secret: process.env.JWT_SECRET,
      });
      return loginPayload.id;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error.message);
      return null;
    }
  }
  return null;
});
