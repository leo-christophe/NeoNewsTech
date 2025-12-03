import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
})

export class ArticleList implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  error: any = null;

  constructor ( 
    private articleService: ArticleService
  ) {}

  /**
   *  Initialise le composant en récupérant la liste des articles.
   */
  ngOnInit(): void {
    this.fetchArticles();
  }

  /**   
   * Rafraîchit la liste des articles.
   */
  refreshNews(): void {
    this.fetchArticles();
  }

  /**
   * Archive un article en mettant à jour son champ archivedAt.
   * @param articleId ID de l'article
   */
  archiveArticle(articleId: number): void {
    this.articles = this.articles.filter(article => article.id !== articleId);

    this.articleService.updateArticleArchivedAt(articleId)
    .subscribe({
      error: (err: any) => {
        console.error('Erreur lors de l\'archivage de l\'article : ', err);
      }
    });
  }

  /**
   * Retourne la liste des articles non archivés.
   * @returns Liste des articles non archivés
   */
  getUnarchivedArticles(): Article[] {
    return this.articles.filter(article => !article.archivedAt);
  }

  /**
   * Ouvre un nouvel onglet avec l'URL spécifiée.
   * @param url URL de l'article
   */
  async goTo(url: string): Promise<Window | null> {
    return window.open(url, '_blank');
  }

  /**
   *  Récupère la liste des articles depuis le service.
   */
  private async fetchArticles(): Promise<void> {
    this.loading = true;
    this.articleService.getArticles()
    .subscribe({
      next: (response : HttpResponse<Article[]>) => {
        // Nouveau tableau pour déclencher la détection de changements
        this.articles = [];
        this.articles = [...(response.body || [])];
        this.loading = false
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}