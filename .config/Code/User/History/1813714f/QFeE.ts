import { clientRepositoryProvider } from './../../framework/providers/client-repository.provider';
import { parse } from 'path';
import {
  ForgotPasswordCommand,
  parseForgotPasswordCommand,
} from '../commands/forgot-password.command';
import { ForgotPasswordService } from '../../../../notification-services/application/forgot-password.service';

export class ForgotPasswordUseCase {
  constructor(private readonly fortgotPasswordService: ForgotPasswordService , private readonly clientRepository: ) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

    await this.fortgotPasswordService.sendNotification(
      command.type,
      command.identification,
    );
  }
}
