import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Articles } from './articles.entity';
import { ArticlesRepository } from './articles.repository';
import { CreateArticlesDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesRepository)
    private articlesRepository: ArticlesRepository,
  ) {}

  async createArticle(
    createArticlesDto: CreateArticlesDto,
    user: User,
  ): Promise<Articles> {
    return this.articlesRepository.createArticle(createArticlesDto, user);
  }

  async getAllArticles(): Promise<Articles[]> {
    return this.articlesRepository.getAllArticles();
  }

  async getArticleById(id: string): Promise<Articles> {
    const article = this.articlesRepository.getArticleById(id);
    return article;
  }
}
