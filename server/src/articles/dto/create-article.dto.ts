import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  articleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  published: Date;
  updated: Date;
  savedUTC: Date;
}
