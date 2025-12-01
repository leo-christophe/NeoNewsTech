import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleSyncService } from 'src/article-sync-service/article-sync-service.service';
import { NewsApiService } from 'src/news-api/news-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleSyncService, NewsApiService],
  exports: [ArticleService],
})
export class ArticleModule {}
