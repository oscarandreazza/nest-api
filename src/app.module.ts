import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtUtils } from './auth/utils/verifyJwt.util';
import { HourMiddleware } from './middleware/hourAccess.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: ['src/migrations/*.ts'],
      synchronize: true,
      migrationsRun: false,
      logging: true,
    }),
    UserModule,
    CustomerModule,
    TicketModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [
    JwtUtils,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
