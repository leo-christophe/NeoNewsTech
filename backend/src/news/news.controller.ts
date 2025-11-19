import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { ArticleService } from 'src/article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { NewsAPIFetchData } from 'src/interfaces/NewsAPIFetchData';
import { NewsAPIArticleData } from 'src/interfaces/NewsAPIArticleData';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService, private readonly articleService: ArticleService){}

    @Get()
    public async getTechNews(): Promise<NewsAPIFetchData>{
        // Vérifier si le fetch de la journée a déjà été fait
        if ((await this.articleService.hasBeenFetchedToday())){
            return {articles:[], status:"forbidden", totalResults: 0};
        }

        // Fetch des news
        const data : NewsAPIFetchData = await this.newsService.fetchNews();

        // Enregistrement des news dans la BD
        data.articles.forEach(async (article) =>{
            const doArticleExists = await this.doArticleExist(article.title);
            if (!doArticleExists){
                this.createArticle(article);
            }
        })
        return data
    }

    /**
     * Vérifie si un article existe déjà dans la base de données à partir de son titre
     * @param title Titre de l'article
     * @returns Vrai s'il existe, faux sinon
     */
    private async doArticleExist(title: string): Promise<Boolean>{
        const exists = await this.articleService.findTitle(title);
        return exists != null;
    }

    private createArticle(article: NewsAPIArticleData){
        article.fetchedAt = new Date()
        const result = this.articleService.create({
            title: article.title,
            author: article.author,
            content: article.content,
            description: article.description,
            fetchedAt: new Date(),
            publishedAt: article.publishedAt,
            source: article.source.name,
            url: article.url,
            urlToImage: article.urlToImage
        })
        console.log("Created: ", result)
        return result;
    }

}
