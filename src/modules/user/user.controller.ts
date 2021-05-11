import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UsePipes,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFormatPipe } from 'src/pipes/query.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  @UsePipes(QueryFormatPipe)
  async list(@Query() query: ListUserDto): Promise<User[]> {
    return this.userService.list(query);
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put('update')
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
