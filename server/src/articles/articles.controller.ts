import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AdminGuard } from '../auth/admin.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { mapArticle } from 'src/mapping';
import { ArticleDto } from './dto/article.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllArticles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: 'desc' | 'asc' = 'desc',
    @Query('search') search: string = '',
  ): Promise<{ list: ArticleDto[]; totalCount: number }> {
    const result = await this.articleService.find(page, limit, sort, search);

    return {
      list: result.list.map(mapArticle),
      totalCount: result.totalCount,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async getArticleById(@Param('id') id: string): Promise<ArticleDto> {
    return mapArticle(await this.articleService.findById(id));
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleDto> {
    return mapArticle(await this.articleService.create(createArticleDto));
  }

  @Put(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDto> {
    return mapArticle(await this.articleService.update(id, updateArticleDto));
  }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  async deleteArticle(@Param('id') id: string): Promise<ArticleDto> {
    return mapArticle(await this.articleService.remove(id));
  }
}
