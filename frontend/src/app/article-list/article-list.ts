import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

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

  constructor ( private articleService: ArticleService ) {}

  /**
   *  Initialise le composant en récupérant la liste des articles.
   */
  ngOnInit(): void {
    this.fetchArticles();
  }

  refreshNews(): void {
    this.fetchArticles();
  }

  /**
   *  Récupère la liste des articles depuis le service.
   */
  private fetchArticles(): void {
    this.loading = true;
    this.articleService.getArticles().subscribe({
      next: (articles : Article[]) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}