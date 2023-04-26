import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3 } from '@aws-sdk/client-s3';
import axios from 'axios';
import { getFileExtension } from './utils/getFileExtension';
import { oneMb } from './utils/validationPipe';

@Injectable()
export class AppService {
  s3Client: S3;
  retryCounter = 1;

  initS3() {
    const s3Client = new S3({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET,
      },
    });
    this.s3Client = s3Client;
  }

  async uploadFile(file) {
    const imageUrl = `test-assignment/${file.originalname}`;
    const bucketParams = {
      Bucket: 'scrapper-images-data',
      Key: imageUrl,
      Body: file.buffer,
      ACL: 'public-read',
    };

    await this.s3Client.send(new PutObjectCommand(bucketParams));
  }
  async getFiles() {
    const Prefix = 'test-assignment/';
    const bucketParams = {
      Bucket: 'scrapper-images-data',
      Prefix,
    };
    const result = [];
    const data = await this.s3Client.listObjectsV2(bucketParams);
    for (const item of data.Contents) {
      if (item.Key !== Prefix) {
        const name = item.Key.split(Prefix)[1];
        result.push({
          name,
          url: item.Key,
        });
      }
    }
    return result;
  }

  sendUrlToDownload = async (data) => {
    const res = await axios.get(data.url, {
      decompress: false,
      responseType: 'arraybuffer',
    });
    const fileExtension = getFileExtension(data.url);
    const imageUrl = `test-assignment/${data.name}.${fileExtension}`;
    const bucketParams = {
      Bucket: 'scrapper-images-data',
      Key: imageUrl,
      Body: res.data.buffer,
      ACL: 'public-read',
    };
    await this.s3Client.send(new PutObjectCommand(bucketParams));
  };

  removeFile = async (url: string) => {
    const Prefix = 'test-assignment/';

    const bucketParams = {
      Bucket: 'scrapper-images-data',
      Prefix,
    };
    const itemsList = await this.s3Client.listObjectsV2(bucketParams);
    for (const content of itemsList.Contents) {
      const isTarget = url === content.Key;
      if (isTarget) {
        await this.s3Client.send(
          new DeleteObjectCommand({
            Bucket: 'scrapper-images-data',
            Key: content.Key,
          }),
        );
      }
    }
  };
}
