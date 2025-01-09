import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
