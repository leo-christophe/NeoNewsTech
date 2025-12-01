import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { finalize } from 'rxjs';
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

  constructor ( private articleService: ArticleService ) {}

  /**
   *  Initialise le composant en récupérant la liste des articles.
   */
  ngOnInit(): void {
    this.fetchArticles();
  }

  refreshNews(): void {
    this.loading = true;
    this.fetchArticles();
    this.loading = false;
  }

  /**
   *  Récupère la liste des articles depuis le service.
   */
  private fetchArticles(): void {
    this.loading = true;
    this.articleService.getArticles()
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (response : HttpResponse<Article[]>) => {
        this.articles = response.body || [];
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}