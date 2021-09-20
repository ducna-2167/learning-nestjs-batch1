import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotoUploadController } from './photo-upload.controller';
import { PhotoUploadService } from './photo-upload.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 5000000,
      },
    }),
  ],
  controllers: [PhotoUploadController],
  providers: [PhotoUploadService],
})
export class PhotoUploadModule {}
