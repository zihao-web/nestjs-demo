import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  BeforeValidate,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  comment: '',
  timestamps: false,
})
export class UserModel extends Model<UserModel> {
  @BeforeValidate
  public static validateData(app: UserModel, options: any) {
    if (!options.transaction) throw new Error('Missing transaction.');
    if (!app.name) throw new Error('创建应用的name不可为空');
  }

  @BeforeCreate
  public static async hashPassword(app: UserModel, options: any) {
    if (!options.transaction) throw new Error('Missing transaction.');
  }

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
    comment: '应用英文ID，保持唯一',
    field: 'id',
  })
  public id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '用户名',
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '用户年龄',
    field: 'age',
  })
  age: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '用户邮箱',
    field: 'email',
  })
  email: string;
}

// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class UserModel {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   age: number;

//   @Column()
//   email: string;
// }
