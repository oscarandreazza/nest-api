import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dts';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // Nenhum papel especificado, acesso concedido
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      // Cabeçalho de autorização não presente, acesso negado
      return false;
    }

    const loginPayload: LoginPayload | null = await this.verificarToken(authorizationHeader);

    if (!loginPayload) {
      // Falha na verificação do token, acesso negado
      return false;
    }

    return requiredRoles.includes(loginPayload.type_user);
  }

  private async verificarToken(authorizationHeader: string): Promise<LoginPayload | null> {
    try {
      return await this.jwtService.verifyAsync(authorizationHeader, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      // Falha na verificação do token
      return null;
    }
  }
}
