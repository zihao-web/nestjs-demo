import { ApiProperty } from '@nestjs/swagger';

export class ListUserDto {
  @ApiProperty({
    description: '搜索用户',
    required: false,
  })
  keyword?: string;

  @ApiProperty({
    description: '分页-第几页',
    required: false,
  })
  pageNum?: number;

  @ApiProperty({
    description: '分页-共多少条',
    required: false,
  })
  pageSize?: number;
}
