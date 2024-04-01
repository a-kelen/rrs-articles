import { ArticleDto } from './articles/dto/article.dto';
import { Article } from './articles/schemas/article.schema';

export function mapArticle(article: Article): ArticleDto {
  return {
    id: article._id,
    title: article.title,
    content: article.content,
    articleId: article.articleId,
    link: article.link,
    published: article.published,
    updated: article.updated,
    savedUTC: article.savedUTC,
    author: article.author,
  };
}
