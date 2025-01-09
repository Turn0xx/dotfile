import { TokensRepository } from '../infrastructure/tokens.repository';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmailSender } from './application/email-sender';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridEmailSender } from './infrastructure/sendgrid.email-sender';
import { EmailValidationService } from './application/email-validation.service';
import { PROVIDERS } from '../../client/providers-strings';
import { IdentityModule } from '../../client/identity/identity.module';
import { ClientRepository } from '../../client/identity/application/client.repository';
import { TokenSchema } from '../infrastructure/tokens.schema';
import { Repository } from 'typeorm';
import { TokensTypeormRepository } from '../infrastructure/tokens.typeorm';
import { NotificationsModule } from '../notification.module';

const tokensRepositoryProvider = {
  provide: PROVIDERS.TOKENS_REPOSITORY,
  useFactory: (repository: Repository<TokenSchema>) => {
    return new TokensTypeormRepository(repository);
  },
  inject: [getRepositoryToken(TokenSchema)],
};


const emailValidatorProvider = {
  provide: PROVIDERS.EMAIL_VALIDATOR,
  useFactory: (
    sendingStrategy: SendGridEmailSender,
    tokenRepository: TokensRepository,
  ) => {
    return new EmailValidationService(tokenRepository, sendingStrategy);
  },
  inject: [SendGridEmailSender, PROVIDERS.TOKENS_REPOSITORY],
};

@Module({
  imports: [forwardRef(() => NotificationsModule) , ConfigModule],
  providers: [
    SendGridEmailSender,
    tokensRepositoryProvider,
    emailValidatorProvider,
  ],
  exports: [tokensRepositoryProvider , emailValidatorProvider],
})
export class EmailsModule {}
