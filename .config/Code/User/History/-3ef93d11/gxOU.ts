import { PROVIDERS } from "../../../providers-strings";




export const forgetPasswordServiceProvider =  {
  provide: PROVIDERS.FORGET_PASSWORD_SERVICE,
  useFactory: () => {
    return new ForgotPasswordService();
  }
}