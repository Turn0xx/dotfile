import { Module, forwardRef } from "@nestjs/common";
import { NotificationsModule } from "../notification.module";

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  controllers: [],
  providers: [],
  exports: []
})
export class SmsModule {}