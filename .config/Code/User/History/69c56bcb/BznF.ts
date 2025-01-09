import { Module } from '@nestjs/common';
import { IdentityModule } from './authentification/identity.module';


@Module({
  imports: [IdentityModule],
  providers: [],
  controllers: [],
})
export class ClientModule {}
