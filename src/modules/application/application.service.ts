import { Injectable } from '@nestjs/common';
import { CreateApplication } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  private application: CreateApplication[] = [
    {
      id: 1,
      name: '张三',
      age: 18,
    },
    {
      id: 1,
      name: '李四',
      age: 20,
    },
  ];

  list(): CreateApplication[] {
    return this.application;
  }

  create(data: CreateApplication) {
    data.id = this.application.length + 1;
    this.application.push(data);
    return data;
  }

  delete(id: number) {
    const index = this.application.findIndex((i) => i.id === id);
    return this.application.splice(index, 1);
  }
}
