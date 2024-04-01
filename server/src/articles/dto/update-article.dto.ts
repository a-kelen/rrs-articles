import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  author?: string;

  savedUTC: Date;
}
