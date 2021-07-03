import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('render')
  root(@Res() res: Response) {
    return res.render('index', { message: 'Hello world!' });
  }

  @Get('over')
  over(@Res() res: Response) {
    return res.render('over', { message: 'Hello world!' });
  }
}
