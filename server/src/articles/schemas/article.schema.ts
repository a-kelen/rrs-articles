import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop()
  title: string;

  @Prop({ default: false })
  published: Date;

  @Prop({ default: false })
  updated: Date;

  @Prop({ default: false })
  savedUTC: Date;

  @Prop()
  link: string;

  @Prop()
  articleId: string;

  @Prop()
  author: string;

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
