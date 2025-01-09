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




@Module({
  imports: [forwardRef(() => NotificationsModule) , ConfigModule],
  providers: [
    SendGridEmailSender,
    emailValidatorProvider,
  ],
  exports: [emailValidatorProvider],
})
export class EmailsModule {}
