import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsDateString()
  @IsNotEmpty()
  archivedAt: Date;
}
