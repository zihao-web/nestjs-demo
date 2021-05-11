import { IsString, IsInt, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    default: '',
  })
  name: string;

  @IsInt()
  @ApiProperty({
    default: '',
  })
  age: number;

  @IsEmail()
  @ApiProperty({
    default: '',
  })
  email: string;
}
