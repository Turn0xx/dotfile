import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridEmailSender } from './infrastructure/sendgrid.email-sender';
import { NotificationsModule } from '../notification.module';
import { emailValidatorProvider } from './framework/email-validator.provider';

@Module({
  imports: [forwardRef(() => NotificationsModule), ConfigModule],
  providers: [emailValidatorProvider],
  exports: [emailValidatorProvider],
})
export class EmailsModule {}
