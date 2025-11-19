import { NewsAPISource } from "./NewsAPISource";

export interface NewsAPIArticleData{
    source: NewsAPISource,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: Date,
    fetchedAt: Date,
    content: string
}