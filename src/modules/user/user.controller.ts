import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from '../../interceptor/logging.interceptor';
import { User } from '../../decorator/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    // -
  }
  @Get('/list')
  @UseInterceptors(LoggingInterceptor)
  list() {
    const a = [['name', 'desc']];
    console.log(a);
    return this.userService.list();
  }

  @Get(':id')
  user(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/create')
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Put('/update')
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
