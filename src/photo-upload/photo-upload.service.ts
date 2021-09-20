import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotoUploadService {
  acceptType = ['image/jpeg', 'image/jpg', 'image/png'];
  handleUpload(file: any) {
    if (this.acceptType.indexOf(file.mimetype) < 0) {
      throw new Error('not accepted type');
    }
    return file;
  }
}
