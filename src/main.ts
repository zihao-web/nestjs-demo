import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

// import * as csurf from 'csurf';
// import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { crossOriginEmbedderPolicy } from 'helmet';

import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
// import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 启动默认的 cors 配置
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('个人学习用API')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  app.use(
    // 限速
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // app.use(csurf()); // CSRF 保护，注册全局中间件
  app.use(crossOriginEmbedderPolicy());
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors(); // 开启 cors 跨域
  await app.listen(3009);
}
bootstrap();
