import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';

@Module({
  imports: [ClientModule.forRoot({ testMode: false })],
  controllers: [],
  providers: [],
})
export class AppModule {}
