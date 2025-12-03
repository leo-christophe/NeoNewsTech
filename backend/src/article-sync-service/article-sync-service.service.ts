import { Injectable, Logger } from '@nestjs/common';
import { NewsApiService } from '../news-api/news-api.service';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entities/article.entity';

/**
 *  Service de synchronisation des articles
 *
 *  @description Permet de gérer la logique de récupération des articles depuis une API externe et de leur stockage en BD
 */
@Injectable()
export class ArticleSyncService {
  private readonly logger = new Logger(ArticleSyncService.name);

  constructor(
    private readonly articleService: ArticleService,
    private readonly newsApiService: NewsApiService,
  ) {}

  /**
   * Fetch BD si à jour, sinon Fetch API + Sauvegarde + Retour BD
   * @return Liste des articles à jour
   */
  public async getArticlesSmart(): Promise<Article[]> {
    // Vérifier si on a déjà fetché aujourd'hui
    const isCacheFresh = await this.articleService.hasBeenFetchedToday();
    console.log('isCacheFresh:', isCacheFresh);
    if (isCacheFresh) {
      this.logger.log('Cache frais. Retour des articles depuis la BD.');
      return await this.articleService.findAll();
    }

    // Si pas frais, on appelle l'API externe
    this.logger.log('Cache obsolète. Appel à NewsAPI...');
    const data = await this.newsApiService.fetchNews();

    // On délègue la sauvegarde et le traitement au service métier
    if (data.articles && data.articles.length > 0) {
      await this.articleService.processAndSaveArticles(data.articles);
    }

    // On retourne la liste complète depuis la BD
    return await this.articleService.findAll();
  }
}
