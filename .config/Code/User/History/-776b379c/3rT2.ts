import { Module } from "@nestjs/common";
import { EmailsModule } from "./emails/emails.module";
import { SmsModule } from "./sms/sms.module";

@Module({
  imports: [EmailsModule , SmsModule],
  controllers: [],
  providers: [],
  exports: [EmailsModule , SmsModule],
})
export class NotificationModule {}