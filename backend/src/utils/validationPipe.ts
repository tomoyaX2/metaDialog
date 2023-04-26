import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { getFileExtension } from './getFileExtension';

const allowedExtensions = ['pdf', 'doc', 'txt', 'docx'];
const oneMb = 1000000;

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any) {
    const currentExtension = getFileExtension(value.originalname);
    if (!allowedExtensions.some((el) => el === currentExtension)) {
      throw new BadRequestException({
        message: 'Invalid file format',
      });
    }
    if (value.size < oneMb * 20) {
      return value;
    } else {
      throw new BadRequestException({
        message: 'File size cannot be more than 20 Mb',
      });
    }
  }
}

export { oneMb };
