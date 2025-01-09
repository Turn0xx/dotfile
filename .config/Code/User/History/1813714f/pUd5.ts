import { parse } from "path";
import { ForgotPasswordCommand, parseForgotPasswordCommand } from "../commands/forgot-password.command";
import { ForgotPasswordService } from "../../../../notification-services/application/forgot-password.service";

export class ForgotPasswordUseCase {

  constructor(
    fortgotPasswordService: ForgotPasswordService        
  ) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

           


  }
}