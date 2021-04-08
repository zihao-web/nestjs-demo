import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './modules/application/application.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
// import { UserMiddleware } from './middleware/user.middleware';
// import { logger } from './middleware/functional.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: 'root',
      password: '123456',
      database: 'explame',
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      logging: console.log,
      timezone: '+08:00',
      autoLoadModels: true,
      synchronize: true,
      sync: {
        force: false,
      },
    }),
    ApplicationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('application/test').forRoutes('*');
    // consumer.apply(logger).forRoutes('*');
  }
}
