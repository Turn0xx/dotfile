import { ClientRepository } from "../client.repository";
import { parseRegistrationCommand } from "../commands/registration.command";
import { ResetPasswordCommand } from "../commands/reset-password.command";

export class ResetPasswordUseCase {

  constructor(
    private readonly userRepository: ClientRepository,
  ) {}

  async handle(command: ResetPasswordCommand) {

    parseRegistrationCommand

  }

}