import { parse } from 'path';
import {
  ForgotPasswordCommand,
  parseForgotPasswordCommand,
} from '../commands/forgot-password.command';
import { ForgotPasswordService } from '../../../../notification-services/application/forgot-password.service';

export class ForgotPasswordUseCase {
  constructor(private readonly fortgotPasswordService: ForgotPasswordService) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

    this.fortgotPasswordService.sendNotification(
      command.type,
      command.identification,
      command.clientId,
    );
  }
}
