import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ArticlesRepository])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
