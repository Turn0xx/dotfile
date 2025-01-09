import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ClientModule.forRoot({ testMode: false }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
