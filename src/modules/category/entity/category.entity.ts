import { Table, Model, Column, DataType } from 'sequelize-typescript';
import * as moment from 'moment';

@Table({
  comment: '分类表',
  timestamps: false,
  tableName: 'category',
  freezeTableName: true, // 保持表名，不需要加复数形式
})
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: '分类ID',
    field: 'id',
  })
  public id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '分类名称',
    field: 'name',
  })
  public name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'created_by',
  })
  public createdBy: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'update_by',
  })
  public updateBy: string;

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
