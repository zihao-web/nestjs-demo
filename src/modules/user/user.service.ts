import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ListUserDto } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { Filterable, FindOptions, Op } from 'sequelize';
import { USER_REPOSITORY } from '../../lib/constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async list(query: ListUserDto): Promise<User[]> {
    const { keyword, pageNum, pageSize } = query;
    const userFilterable: Filterable<User> = {};
    if (query.keyword) {
      userFilterable.where = {
        name: { [Op.like]: `%${keyword}%` },
      };
    }
    const userFindOptions: FindOptions<User> = {
      ...userFilterable,
    };
    if (pageNum && pageSize) {
      userFindOptions.limit = pageSize;
      userFindOptions.offset = pageSize * (pageNum - 1);
    }
    return await this.userRepository.findAll(userFindOptions);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('找不到此用户', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return await user.update(data);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.destroy({
      where: { id },
    });
  }
}
