import {
  Get,
  Req,
  Post,
  Body,
  Query,
  Param,
  Header,
  Delete,
  HttpCode,
  Redirect,
  // UsePipes,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ApplicationService } from './application.service';
import { CreateApplication } from './dto/create-application.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorator/roles.decorator';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { User } from '../../decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application 接口')
@Controller('application')
@Roles('admin')
// @Controller({ host: 'admin.example.com' })
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {
    // -
  }
  @Get('/test')
  @HttpCode(204)
  // @Header('Cache-Control', 'application/json')
  @Header('Cache-Control', 'text/html')
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'this is first function in mine';
  }

  @Get('/list')
  @UseInterceptors(LoggingInterceptor)
  list() {
    return this.applicationService.list();
  }

  @Get('/error')
  error() {
    throw new HttpException('this is error message', HttpStatus.FORBIDDEN);
  }

  @Get('/user')
  // @UseGuards(RolesGuard)
  user(@User('name') name: string) {
    return name;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return {
  //     param: id,
  //   };
  // }

  @Get('/item/:id')
  @UseGuards(AuthGuard)
  findOnePipe(@Param('id', ParseIntPipe) id: number) {
    return {
      param: id,
    };
  }

  @Get('/redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(@Query('version') version: string | number) {
    return { url: `https://docs.nestjs.com/v${version}/` };
  }

  @Post('/create')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body(new ValidationPipe()) data: CreateApplication) {
    console.log(data);
    return this.applicationService.create(data);
  }

  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.delete(id);
  }
}
