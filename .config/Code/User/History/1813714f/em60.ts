import { clientRepositoryProvider } from './../../framework/providers/client-repository.provider';
import { parse } from 'path';
import {
  ForgotPasswordCommand,
  parseForgotPasswordCommand,
} from '../commands/forgot-password.command';
import { ForgotPasswordService } from '../../../../notification-services/application/forgot-password.service';
import { ClientRepository } from '../client.repository';
import { Client } from '../../domain/client';
import { ClientNotFoundError } from '../../errors/client-not-found.error';

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

    if (!client) {
      throw new ClientNotFoundError();
    }




    await this.fortgotPasswordService.sendNotification(
      command.type,
      command.identification,
      client.Id,
    );
  }
}
