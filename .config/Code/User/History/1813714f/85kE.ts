import { parse } from "path";
import { ForgotPasswordCommand, parseForgotPasswordCommand } from "../commands/forgot-password.command";

export class ForgotPasswordUseCase {

  constructor(
    fortgotPasswordService: Forg        
  ) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

           


  }
}