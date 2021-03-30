import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UserModel } from './entity/user.entity';
import { InjectModel } from '@nestjs/sequelize';

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
    return await this.userModel.findOne({
      where: { id },
    });
  }

  // async create(data: CreateUser): Promise<UserModel> {
  //   return await this.userModel.create<UserModel>(data);
  // }
  async create(data: CreateUser) {
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.userModel.destroy({
      where: { id },
    });
  }
}
