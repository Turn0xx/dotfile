import { Module, forwardRef } from "@nestjs/common";

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  controllers: [],
  providers: [],
  exports: []
})
export class SmsModule {}