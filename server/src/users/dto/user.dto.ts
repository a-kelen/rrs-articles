import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
