import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async findById(id: string): Promise<Article> {
    return this.articleModel.findById(id);
  }

  async find(
    page: number,
    limit: number,
    sort: string,
    search: string,
  ): Promise<{ list: Article[]; totalCount: number }> {
    const skip = page * limit;
    const query = this.articleModel.find();

    if (search) {
      query.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    if (sort) {
      const sign = sort === 'desc' ? '-' : '';
      query.sort(`${sign}published`);
    }

    const totalCount = await query.clone().countDocuments().exec();

    query.skip(skip).limit(limit);

    const articles = await query.exec();

    return {
      list: articles,
      totalCount,
    };
  }

  async create(articleDto: CreateArticleDto): Promise<Article> {
    const now = new Date();
    articleDto.savedUTC = now;
    articleDto.published = now;
    articleDto.updated = now;

    const createdArticle = new this.articleModel(articleDto);
    createdArticle.savedUTC = new Date();

    return createdArticle.save();
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    updateArticleDto.savedUTC = new Date();
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Article> {
    return this.articleModel.findByIdAndDelete(id);
  }

  async getLastPublishedArticle(): Promise<Article> {
    return this.articleModel.findOne().sort({ published: -1 }).exec();
  }

  async insertMany(articles: Article[]): Promise<void> {
    await this.articleModel.insertMany(articles);
  }
}
