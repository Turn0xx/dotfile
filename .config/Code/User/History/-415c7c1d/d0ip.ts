
export const emailValidatorProvider = {
  provide: PROVIDERS.EMAIL_VALIDATOR,
  useFactory: (
    sendingStrategy: SendGridEmailSender,
    tokenRepository: TokensRepository,
  ) => {
    return new EmailValidationService(tokenRepository, sendingStrategy);
  },
  inject: [SendGridEmailSender, PROVIDERS.TOKENS_REPOSITORY],
};