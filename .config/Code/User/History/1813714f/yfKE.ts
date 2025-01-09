import { clientRepositoryProvider } from './../../framework/providers/client-repository.provider';
import { parse } from 'path';
import {
  ForgotPasswordCommand,
  parseForgotPasswordCommand,
} from '../commands/forgot-password.command';
import { ForgotPasswordService } from '../../../../notification-services/application/forgot-password.service';
import { ClientRepository } from '../client.repository';

export class ForgotPasswordUseCase {
  constructor(private readonly fortgotPasswordService: ForgotPasswordService , private readonly clientRepository: ClientRepository) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);

    if (command.type === 'email') {
      

    await this.fortgotPasswordService.sendNotification(
      command.type,
      command.identification,
    );
  }
}
