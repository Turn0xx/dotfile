import { Inject } from "@nestjs/common";
import { ForgotPasswordService } from "../../../../notification-services/application/forgot-password.service";
import { PROVIDERS } from "../../../providers-strings";




export const forgetPasswordServiceProvider =  {
  provide: PROVIDERS.FORGET_PASSWORD_SERVICE,
  useFactory: () => {
    return new ForgotPasswordService();
  }

  inject: [
    PROVIDERS.EMAIL_SENDER,
    PROVIDERS.
    PROVIDERS.TOKENS_REPOSITORY
  ]
}