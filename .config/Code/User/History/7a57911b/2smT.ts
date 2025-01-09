export class ResetPasswordUseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async handle() {

  }

}