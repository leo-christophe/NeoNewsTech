import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { ArticleService } from 'src/article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { NewsAPIFetchData } from 'src/interfaces/NewsAPIFetchData';
import { NewsAPIArticleData } from 'src/interfaces/NewsAPIArticleData';
import { Article } from 'src/article/entities/article.entity';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService, private readonly articleService: ArticleService){}

    @Get()
    public async getTechNews(): Promise<NewsAPIFetchData>{
        // Vérifier si le fetch de la journée a déjà été fait -> éviter de fetch les mêmes news et dépasser le quota API
        if ((await this.articleService.hasBeenFetchedToday())){
            return { articles: [], status:"forbidden", totalResults: 0 };
        }

        // Fetch des news
        const data : NewsAPIFetchData = await this.newsService.fetchNews();

        // Enregistrement des news dans la BD
        data.articles.forEach(async (article) =>{
            //  Vérifier si l'article existe déjà avant de l'insérer (Précaution)
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
    private async doArticleExist(title: string): Promise<Boolean> {
        const exists = await this.articleService.findTitle(title);
        return exists != null;
    }

    /**
     * Insère un article dans la base de données après avoir formater les données
     * @param article Article récupéré à partir de l'API NewsAPI
     * @returns Résultat de la création d'article
     */
    private createArticle(article: NewsAPIArticleData) : Promise<Article>{
        // Formater les données
        if (article.content !=  null && article.content.includes("<ul><li></li><li></li><li></li></ul>")){
            article.content.replace("<ul><li></li><li></li><li></li></ul>","")
        }

        // Créer l'article
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
    
        return result;
    }
}
