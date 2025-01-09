
const dateProvider = {
  provide: PROVIDERS.DATE_PROVIDER,
  useFactory: () => {
    return new RealDateProvider();
  },
};

const registrationUseCaseProvider = {
  provide: PROVIDERS.REGISTRATION_USE_CASE,
  useFactory: (
    dateProvider: RealDateProvider,
    organizerRepository: ClientTypeOrmRepository,
    emailValidator: EmailValidationService,
  ) => {
    return new RegistrationUseCase(
      dateProvider,
      organizerRepository,
      emailValidator,
    );
  },
  inject: [
    PROVIDERS.DATE_PROVIDER,
    PROVIDERS.CLIENT_REPOSITORY,
    PROVIDERS.EMAIL_VALIDATOR,
  ],
};

const validateTokenUseCaseProvider = {
  provide: PROVIDERS.VALIDATE_TOKEN_USE_CASE,
  useFactory: (
    emailService: EmailValidationService,
    clientRepository: ClientTypeOrmRepository,
  ) => {
    return new ValidateTokenUseCase(emailService, clientRepository);
  },
  inject: [PROVIDERS.EMAIL_VALIDATOR, PROVIDERS.CLIENT_REPOSITORY],
};