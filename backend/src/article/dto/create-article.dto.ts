export class CreateArticleDto {
    title: string;

    description: string;
    
    url: string;
    
    author: string;

    urlToImage: string | null;

    source: string;
    
    content: string;
    
    publishedAt: Date;
    
    fetchedAt: Date;
}
