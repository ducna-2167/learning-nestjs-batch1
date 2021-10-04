import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoUploadModule } from './photo-upload/photo-upload.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    AuthModule,
    PhotoUploadModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
