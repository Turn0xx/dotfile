import { clientRepositoryProvider } from './../../framework/providers/client-repository.provider';
import { parse } from 'path';
import {
  ForgotPasswordCommand,
  parseForgotPasswordCommand,
} from '../commands/forgot-password.command';
import { ForgotPasswordService } from '../../../../notification-services/application/forgot-password.service';
import { ClientRepository } from '../client.repository';
import { Client } from '../../domain/client';

export class ForgotPasswordUseCase {
  constructor(private readonly fortgotPasswordService: ForgotPasswordService , private readonly clientRepository: ClientRepository) {}

  async handle(command: ForgotPasswordCommand) {
    parseForgotPasswordCommand(command);
    let client: Client;
    if (command.type === 'email') {
      client = await this.clientRepository.findByEmail(command.identification);
    } else {
      client = await this.clientRepository.findByPhone(command.identification);
    }


    await this.fortgotPasswordService.sendNotification(
      command.type,
      command.identification,
    );
  }
}
