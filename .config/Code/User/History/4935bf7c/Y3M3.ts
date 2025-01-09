import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridEmailSender } from './infrastructure/sendgrid.email-sender';
import { NotificationsModule } from '../notification.module';
import { emailValidationServiceProvider } from './framework/email-validation-service.provider';

@Module({
  imports: [forwardRef(() => NotificationsModule), ConfigModule],
  providers: [emailValidationServiceProvider],
  exports: [emailValidationServiceProvider],
})
export class EmailsModule {}
