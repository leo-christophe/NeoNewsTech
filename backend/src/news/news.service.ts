import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { NewsAPIFetchData } from 'src/interfaces/NewsAPIFetchData';

@Injectable()
export class NewsService {
  private readonly apiKey = process.env.NEWS_API_KEY;
  private readonly apiUrl = 'https://newsapi.org/v2/top-headlines';

  async fetchNews(pageSize: number = 100): Promise<NewsAPIFetchData> {
    try {
      const articles = await axios.get<NewsAPIFetchData>(this.apiUrl, {
        params: {
          category: 'technology',
          language: 'en',
          pageSize: pageSize,
          apiKey: this.apiKey,
        },
      });
      return articles.data;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Impossible de récupérer les news',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
