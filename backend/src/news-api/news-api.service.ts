import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { NewsAPIFetchData } from 'src/interfaces/NewsAPIFetchData';

@Injectable()
export class NewsApiService {
  private readonly logger = new Logger(NewsApiService.name);
  private readonly apiKey = process.env.NEWS_API_KEY;
  private readonly apiUrl = 'https://newsapi.org/v2/top-headlines';

  async fetchNews(pageSize: number = 100): Promise<NewsAPIFetchData> {
    try {
      this.logger.log('Fetching data from External News API...');
      const response = await axios.get<NewsAPIFetchData>(this.apiUrl, {
        params: {
          category: 'technology',
          language: 'en',
          pageSize: pageSize,
          apiKey: this.apiKey,
        },
      });
      return response.data;
    } catch (err) {
      this.logger.error('Error fetching external news', err);
      throw new HttpException(
        'Impossible de récupérer les news',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
