import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSchema } from './infrastructure/tokens.schema';
import { ConfigModule } from '@nestjs/config';

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
