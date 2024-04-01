export interface Article {
  id: string;
  articleId: string;
  title: string;
  content: string;
  published: Date;
  updated: Date;
  savedUTC: Date;
  link: string;
  author: string;
}

export type SavingMode = 'create' | 'update';
