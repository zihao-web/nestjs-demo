import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class QueryFormatPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      let { pageNum, pageSize } = value;
      if (pageNum) {
        pageNum = parseInt(pageNum, 10);
        value.pageNum = pageNum;
      }
      if (pageSize) {
        pageSize = parseInt(pageSize, 10);
        value.pageSize = pageSize;
      }
    }
    return value;
  }
}
