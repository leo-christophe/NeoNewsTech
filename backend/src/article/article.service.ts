import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { NewsAPIArticleData } from 'src/interfaces/NewsAPIArticleData';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  /**
   * Traite une liste d'articles externes et sauvegarde ceux qui n'existent pas.
   */
  async processAndSaveArticles(articles: NewsAPIArticleData[]): Promise<void> {
    for (const articleData of articles) {
      const exists = await this.findTitle(articleData.title);
      if (!exists) {
        await this.createFromExternal(articleData);
      }
    }
  }

  /**
   * Crée un article à partir des données de l'API externe (avec formatage)
   */
  private async createFromExternal(data: NewsAPIArticleData): Promise<Article> {
    // Nettoyage du contenu (Logique déplacée du Controller vers le Service)
    let content = data.content;
    if (content && content.includes('<ul><li></li><li></li><li></li></ul>')) {
      content = content.replace('<ul><li></li><li></li><li></li></ul>', '');
    }

    const newArticle = this.articleRepository.create({
      title: data.title,
      author: data.author,
      content: content,
      description: data.description,
      publishedAt: data.publishedAt,
      source: data.source.name,
      url: data.url,
      urlToImage: data.urlToImage,
    });

    return await this.articleRepository.save(newArticle);
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleRepository.save(createArticleDto);
  }

  async findTitle(title: string): Promise<Article | null> {
    return await this.articleRepository.findOne({ where: { title } });
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find({
      order: { publishedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Article | null> {
    return await this.articleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }

  /**
   * Vérifie si le cache est à jour
   */
  async hasBeenFetchedToday(): Promise<boolean> {
    const lastFetch: undefined | { lastFetch: string } =
      await this.articleRepository
        .createQueryBuilder('article')
        .select('MAX(article.fetchedAt)', 'lastFetch')
        .getRawOne();

    if (lastFetch == undefined || !lastFetch.lastFetch) return false;

    return this.isToday(new Date(lastFetch.lastFetch));
  }

  /**
   * Vérifie si une date correspond à celle d'aujourd'hui
   * @param date Date à vérifier
   * @returns true si la date est aujourd'hui, sinon false
   */
  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
