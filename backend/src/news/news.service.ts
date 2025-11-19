import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { NewsAPIFetchData } from 'src/interfaces/NewsAPIFetchData';

@Injectable()
export class NewsService {
    private readonly apiKey = process.env.NEWS_API_KEY;
    private readonly apiUrl = 'https://newsapi.org/v2/top-headlines';

  async fetchNews(pageSize: Number = 100): Promise<NewsAPIFetchData> {
    try {

      const articles : any = await axios.get<NewsAPIFetchData>(this.apiUrl, {
        params: {
          category: 'technology',
          language: 'en',
          pageSize: 100,
          apiKey: this.apiKey,
        },
      });
      console.log(articles.data)
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