import {
  Res,
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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFormatPipe } from 'src/pipes/query.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('list')
  @UsePipes(QueryFormatPipe)
  async list(
    @Query() query: ListUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User[]> {
    // 设置 cookie 返回给客户端
    response.cookie('key', 'value');
    return this.userService.list(query);
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    this.eventEmitter.emit('user.findOne', {
      orderId: 1,
      payload: {},
    });

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

  /**
   * 上传单文件方法
   * @param file 文件内容
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  /**
   * 上传多个文件方法
   * @param files 多文件内容
   */
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
