import { EmailSender } from './../../../../notification-services/emails/application/email-sender';
import { Inject } from "@nestjs/common";
import { ForgotPasswordService } from "../../../../notification-services/application/forgot-password.service";
import { PROVIDERS } from "../../../providers-strings";
import { FakeSmsSender } from "../../../../notification-services/sms/test/sms-sender.fake";




export const forgetPasswordServiceProvider =  {
  provide: PROVIDERS.FORGET_PASSWORD_SERVICE,
  useFactory: () => {
    const smsFake = new FakeSmsSender();

    return new ForgotPasswordService(EmailSender);
  },
  inject: [
    PROVIDERS.EMAIL_SENDER,
    PROVIDERS.TOKENS_REPOSITORY
  ]
}