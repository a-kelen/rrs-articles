import { Module } from '@nestjs/common';
import { ParsingService } from './parsing.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  providers: [ParsingService],
  exports: [ParsingModule],
  imports: [ScheduleModule.forRoot(), ArticlesModule],
})
export class ParsingModule {}
