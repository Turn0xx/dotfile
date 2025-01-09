import { ClientNotFoundError } from "../../errors/client-not-found.error";
import { ClientRepository } from "../client.repository";
import { ResetPasswordCommand, parseResetPasswordCommand } from "../commands/reset-password.command";
import * as bcrypt from 'bcrypt';

export class ResetPasswordUseCase {

  constructor(
    private readonly userRepository: ClientRepository,
  ) {}

  async handle(command: ResetPasswordCommand) {

    parseResetPasswordCommand(command);

    const client = await this.userRepository.findByEmail(command.email);

    if (!client) {
      throw new ClientNotFoundError();
    }

    const hashedPassword = await bcrypt.hash(command.password , await bcrypt.genSalt());

    client.changePassword(hashedPassword);

    await this.userRepository.save(client.toDataModel());
  }

}