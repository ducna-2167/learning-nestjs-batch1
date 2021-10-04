import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { GetUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';

import { Articles } from './articles.entity';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  @Render('articles')
  async getArtilce() {
    let result;
    await this.articlesService
      .getAllArticles()
      .then((response) => (result = response));
    return { result: result };
  }

  @Post()
  async createArcticle(
    @Body() createArticlesDto: CreateArticlesDto,
    @GetUser() user: User,
  ): Promise<Articles> {
    const article = await this.articlesService.createArticle(
      createArticlesDto,
      user,
    );
    console.log(article);
    return article;
  }

  @Get('/:id')
  @Render('articles-id')
  async getArtilceById(@Param('id') id: string) {
    const article = await this.articlesService.getArticleById(id);
    console.log(article);
    return { article: article };
  }
}
