// import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplication {
  @IsInt()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty({
    enum: ['王五', '赵六', '孙七', '刘八', '毛九'],
  })
  name: string;

  @IsInt()
  @ApiProperty()
  age: number;
}
