import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { dataBaseConfigModule } from './database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
    dataBaseConfigModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
