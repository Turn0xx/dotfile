import { Module } from '@nestjs/common';
import { ClientModule } from './pocket-ticket/client/client.module';
import { dataBaseConfigModule } from './database.config';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { IdentityModule } from './pocket-ticket/client/identity/identity.module';
import { AuthModule } from './pocket-ticket/client/authentification/framework/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    dataBaseConfigModule,
    IdentityModule,
    AuthModule,
    DevtoolsModule.register({
      http: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
