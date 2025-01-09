import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TokenSchema } from './infrastructure/tokens.schema';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PROVIDERS } from '../client/providers-strings';
import { TokensTypeormRepository } from './infrastructure/tokens.typeorm';


const tokensRepositoryProvider = {
  provide: PROVIDERS.TOKENS_REPOSITORY,
  useFactory: (repository: Repository<TokenSchema>) => {
    return new TokensTypeormRepository(repository);
  },
  inject: [getRepositoryToken(TokenSchema)],
}

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenSchema]),
    EmailsModule,
    SmsModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
  exports: [EmailsModule, SmsModule , TypeOrmModule],
})
export class NotificationsModule {}
