import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchema } from './infrastructure/tokens.schema';

@Module({
  imports: [TypeOrmModule.forFeature([TokenSchema]), EmailsModule, SmsModule ],
  controllers: [],
  providers: [],
  exports: [EmailsModule, SmsModule],
})
export class NotificationsModule {}
