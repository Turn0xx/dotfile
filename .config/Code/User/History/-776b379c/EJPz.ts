import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchema } from './infrastructure/tokens.schema';
import { ConfigModule } from '@nestjs/config';
import { tokensRepositoryProvider } from './framework/token-repository.provider';
import { SendGridEmailSender } from './emails/infrastructure/sendgrid.email-sender';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenSchema]),
    EmailsModule,
    SmsModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [tokensRepositoryProvider , SendGridEmailSender],
  exports: [
    EmailsModule,
    SmsModule,
    TypeOrmModule,
    tokensRepositoryProvider,
    SendGridEmailSender,
  ],
})
export class NotificationsModule {}
