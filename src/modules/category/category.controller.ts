import { Get, Post, Body, Param, UsePipes, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CreateUserDto } from './dto/create-category.dto';
import { QueryFormatPipe } from 'src/pipes/query.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';

@ApiTags('分类接口')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private configService: ConfigService,
  ) {}

  @Get('list')
  @UsePipes(QueryFormatPipe)
  async list(): Promise<Category[]> {
    const name = this.configService.get<string>('DATABASE_USER');
    const dbHost = this.configService.get('database');

    console.log(name, dbHost);
    return this.categoryService.list();
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.categoryService.create(data);
  }
}
