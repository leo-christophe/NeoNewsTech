import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './article-list.html',
  styleUrl: './article-list.scss',
})
export class ArticleList implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  error: any = null;

  constructor ( private articleService: ArticleService ) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

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