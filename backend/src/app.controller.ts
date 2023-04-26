import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileValidationPipe } from './utils/validationPipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFiles() {
    return this.appService.getFiles();
  }

  //no time to describe DTO, maybe later. If you wanna to see my Nest code - welcome to my github then :)
  @Post('upload-file')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('application/octet-stream')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
    },
  })
  @Post('send-url')
  sendUrlToDownload(@Body() body) {
    return this.appService.sendUrlToDownload(body);
  }

  @Post('delete')
  removeDocument(@Body() body: { url: string }) {
    return this.appService.removeFile(body.url);
  }
}
