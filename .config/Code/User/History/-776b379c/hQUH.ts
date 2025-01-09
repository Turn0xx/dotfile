import { Module } from "@nestjs/common";
import { EmailsModule } from "./emails/emails.module";

@Module({
  imports: [EmailsModule],
  controllers: [],
  providers: [],
  exports: [EmailsModule],
})
export class NotificationModule {}