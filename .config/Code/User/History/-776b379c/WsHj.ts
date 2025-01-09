import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TokenSchema } from './infrastructure/tokens.schema';
import { ConfigModule } from '@nestjs/config';
import { tokensRepositoryProvider } from './framework/token-repository.provider';


@Module({
  imports: [
    TypeOrmModule.forFeature([TokenSchema]),
    EmailsModule,
    SmsModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [tokensRepositoryProvider],
  exports: [EmailsModule, SmsModule, TypeOrmModule, tokensRepositoryProvider],
})
export class NotificationsModule {}
