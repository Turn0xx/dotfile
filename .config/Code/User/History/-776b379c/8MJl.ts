import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    EmailsModule, SmsModule],
  controllers: [],
  providers: [],
  exports: [EmailsModule, SmsModule],
})
export class NotificationsModule {}
