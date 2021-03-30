import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { User } from '../../decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private applicationService: UserService) {
    // -
  }
  @Get('/list')
  @UseInterceptors(LoggingInterceptor)
  list() {
    return this.applicationService.list();
  }

  @Get('/user')
  user(@User('name') name: string) {
    return name;
  }

  @Post('/create')
  create(@Body(new ValidationPipe()) data: CreateUser) {
    console.log(data);
    return this.applicationService.create(data);
  }

  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.delete(id);
  }
}
