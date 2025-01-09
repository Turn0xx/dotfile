import { parse } from "path";
import { ClientRepository } from "../client.repository";
import { ResetPasswordCommand, parseResetPasswordCommand } from "../commands/reset-password.command";

export class ResetPasswordUseCase {

  constructor(
    private readonly userRepository: ClientRepository,
  ) {}

  async handle(command: ResetPasswordCommand) {

    parseResetPasswordCommand(command);

  }

}