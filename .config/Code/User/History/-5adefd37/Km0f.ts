import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { dataBaseConfigModule } from './database.config';

@Module({
  imports: [
    
    dataBaseConfigModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
