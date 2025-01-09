import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { dataBaseConfigModule } from './database.config';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot(),
    dataBaseConfigModule,
    ClientModule,
    DevtoolsModule.register({
      http: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
