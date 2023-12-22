import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HourMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const hour = new Date().getHours();

    if (hour < 6 || hour > 23) {
      return res.status(401).json({ message: 'Funcionalidade disponível somente durante o dia!' });
    }

    next();
  }
}
