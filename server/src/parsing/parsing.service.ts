import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { parseString } from 'xml2js';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/schemas/article.schema';

@Injectable()
export class ParsingService {
  constructor(private readonly articlesService: ArticlesService) {}
  private readonly logger = new Logger(ParsingService.name);

  onModuleInit() {
    this.parseArticles();
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async parseArticles() {
    try {
      const response = await axios.get(process.env.RSS_URL);
      const xmlData = response.data;

      let articles: Article[] = [];

      parseString(xmlData, async (err, result) => {
        if (!err && result && result.feed) {
          articles = result.feed.entry.map((entry) => ({
            articleId: entry.id[0],
            published: new Date(entry.published[0]),
            updated: new Date(entry.updated[0]),
            title: entry.title[0],
            content: entry.content[0]['_'],
            link: entry.link[0]['$'].href,
            author: entry.author[0].name[0],
            savedUTC: new Date(),
          }));
        }
      });

      const lastPublishedArticle =
        await this.articlesService.getLastPublishedArticle();
      if (lastPublishedArticle) {
        articles = articles.filter(
          (a) => a.published > lastPublishedArticle.published,
        );
      }

      if (articles.length > 0) {
        await this.articlesService.insertMany(articles);
        this.logger.log(`Saved ${articles.length} RSS articles`);
      } else {
        this.logger.log(`Everything is up to date`);
      }
    } catch (error) {
      this.logger.error('Error fetching or parsing RSS feed:', error);
    }
    this.logger.log('Articles parsing finished');
  }
}
