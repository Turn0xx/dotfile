import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfigModule } from './database.config';

@Module({
  imports: [
    dataBaseConfigModule,
    ClientModule.forRoot({ testMode: false }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
