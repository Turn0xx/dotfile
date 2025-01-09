import { Module } from "@nestjs/common";
import { Email } from "../../shared/bases/value-objects/email";
import { EmailsModule } from "./emails/emails.module";

@Module({
  imports: [EmailsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class NotificationModule {}