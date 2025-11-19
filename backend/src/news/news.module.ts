import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { ArticleService } from 'src/article/article.service';
import { ArticleModule } from 'src/article/article.module';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [ArticleModule]
})
export class NewsModule {}
