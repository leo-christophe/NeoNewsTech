import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  urlToImage: string | null;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  @IsNotEmpty()
  publishedAt: Date;
}
