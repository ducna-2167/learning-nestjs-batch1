import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoUploadService } from './photo-upload.service';

@Controller('photo-upload')
export class PhotoUploadController {
  constructor(private uploadService: PhotoUploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.handleUpload(file);
  }

  @Get(':fileName')
  async getAllImage(@Param('fileName') fileName, @Res() res): Promise<any> {
    res.sendFile(fileName, { root: 'uploads' });
  }
}
