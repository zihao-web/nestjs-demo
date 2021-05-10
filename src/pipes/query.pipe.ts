import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let { pageNum, pageSize } = value;
    if (metadata.type === 'query') {
      if (pageNum) {
        pageNum = parseInt(pageNum, 10);
      }
      if (pageSize) {
        pageSize = parseInt(pageSize, 10);
      }
    }
    return {
      ...value,
      pageNum,
      pageSize,
    };
  }
}
