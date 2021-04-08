import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async list(): Promise<UserModel[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await this.userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('找不到此用户', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    return await this.userModel.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserModel> {
    const user = await this.findOne(id);
    return await user.update(data);
  }

  async delete(id: number): Promise<void> {
    await this.userModel.destroy({
      where: { id },
    });
  }
}
