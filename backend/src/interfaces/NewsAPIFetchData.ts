import { NewsAPIArticleData } from "./NewsAPIArticleData";

export interface NewsAPIFetchData{
    status: string,
    totalResults: number,
    articles: Array<NewsAPIArticleData>
}