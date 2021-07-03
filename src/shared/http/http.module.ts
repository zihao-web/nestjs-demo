import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';
import { HttpService } from './http.service';

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
