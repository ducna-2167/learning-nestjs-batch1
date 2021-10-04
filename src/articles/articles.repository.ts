import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Articles } from './articles.entity';
import { CreateArticlesDto } from './dto/create-article.dto';

@EntityRepository(Articles)
export class ArticlesRepository extends Repository<Articles> {
  async createArticle(
    createArticleDto: CreateArticlesDto,
    user: User,
  ): Promise<Articles> {
    const { link, title, content } = createArticleDto;
    const article = this.create({ link, title, content, user });
    await this.save(article);
    return article;
  }

  async getAllArticles(): Promise<Articles[]> {
    return this.find();
  }

  async getArticleById(id: string): Promise<Articles> {
    const article: Articles = await this.findOne({ id });
    return article;
  }
}
