import { brotliCompress } from "zlib";
import { ClientNotFoundError } from "../../errors/client-not-found.error";
import { ClientRepository } from "../client.repository";
import { ResetPasswordCommand, parseResetPasswordCommand } from "../commands/reset-password.command";

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

    const hashedPassword = await bcrypt.hash(command.password , bcrypt.genSalt());

    client.changePassword(command.password);

    await this.userRepository.save(client.toDataModel());
  }

}