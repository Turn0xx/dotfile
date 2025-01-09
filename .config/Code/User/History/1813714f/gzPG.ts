import { parse } from "path";
import { ForgotPasswordCommand, parseForgotPasswordCommand } from "../commands/forgot-password.command";

export class ForgotPasswordUseCase {

  constructor() {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

    


  }
}