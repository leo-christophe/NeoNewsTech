import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:3000/article'; 

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les articles existants depuis l'API.
   * @return Observable avec la liste des articles.
   */
  
  getArticles(): Observable<HttpResponse<Article[]>> {
    return this.http.get<Article[]>(`${this.apiUrl}`, {observe: 'response'});
  }

  /**
   * Met à jour la date d'archivage d'un article.
   * @param articleId ID de l'article
   * @returns Observable avec la réponse HTTP contenant l'article mis à jour.
   */
  updateArticleArchivedAt(articleId: number): Observable<HttpResponse<Article>> {
    return this.http.patch<Article>(`${this.apiUrl}/${articleId}`, { archivedAt: new Date() }, {observe: 'response'});
  }
}