import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: typeof Category,
  ) {}

  async list(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new HttpException('找不到此分类', HttpStatus.FORBIDDEN);
    }
    return category;
  }
  async create(data: CreateUserDto): Promise<Category> {
    return await this.categoryRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
