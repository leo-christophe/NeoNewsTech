import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = createArticleDto.title;
    article.description = createArticleDto.description;
    article.source = createArticleDto.source;
    article.publishedAt = createArticleDto.publishedAt;
    article.url = createArticleDto.url;
    article.author = createArticleDto.author;
    article.urlToImage = createArticleDto.urlToImage;
    article.content = createArticleDto.content;
    return await this.articleRepository.save(article);
  }

  async findTitle(title: string): Promise<Article | null> {
    return await this.articleRepository.findOne({ where: { title } });
  }

  /**
   * Vérifie si les articles ont déjà été importés aujourd'hui
   * @returns Vrai si déjà importés, faux sinon
   */
  async hasBeenFetchedToday(): Promise<boolean> {
    const lastFetch = await this.articleRepository
      .createQueryBuilder('article')
      .select('MAX(article.fetchedAt)', 'lastFetch')
      .getRawOne();

    return (lastFetch && this.isToday(new Date(lastFetch.lastFetch))) 
  }

  /**
   * Retourne tous les articles du plus récent au plus ancien
   * @returns Article[] Un tableau d'articles
   */
  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find({
      order: {
        publishedAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Article | null> {
    return await this.articleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
