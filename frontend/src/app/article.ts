import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  author: string;
  urlToImage: string;
  source: string | null;
  content: string | null;
  publishedAt: Date;
  fetchedAt: Date;
  archivedAt: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/news'; 

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les articles existants depuis l'API.
   * @return Observable avec la liste des articles.
   */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/get-articles`);
  }
}