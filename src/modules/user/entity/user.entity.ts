import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  BeforeValidate,
} from 'sequelize-typescript';
import * as moment from 'moment';

@Table({
  comment: '',
  timestamps: false,
  tableName: 'users',
  freezeTableName: true, // 保持表名，不需要加复数形式
})
export class UserModel extends Model {
  // @BeforeValidate
  // public static validateData(app: UserModel, options: any) {
  //   if (!options.transaction) throw new Error('Missing transaction.');
  //   if (!app.name) throw new Error('创建应用的name不可为空');
  // }

  // @BeforeCreate
  // public static async hashPassword(app: UserModel, options: any) {
  //   if (!options.transaction) throw new Error('Missing transaction.');
  // }

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户ID',
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

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'created_at',
    get() {
      return moment(this.getDataValue('createdAt')).format(
        'YYYY-MM-DD HH:mm:ss',
      );
    },
  })
  public createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'updated_at',
    get() {
      return moment(this.getDataValue('updatedAt')).format(
        'YYYY-MM-DD HH:mm:ss',
      );
    },
  })
  public updatedAt: Date;
}
