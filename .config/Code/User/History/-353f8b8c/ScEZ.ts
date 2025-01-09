import { last } from 'rxjs';
import { DateProvider } from '../../domain/date-provider';
import { Organizer, OrganizerJson } from '../../domain/organizer';
import { OrganizerRepository } from '../organizer.repository';
import { date, z } from 'zod';
import * as bcrypt from 'bcrypt';
import {
  ValidationException,
  mapValidationErrors,
} from '../../zod-parsing.handler';
import { Http2ServerResponse } from 'http2';
import { HttpCode } from '@nestjs/common';
import { EmailValidator } from 'src/pocket-ticket/emails/application/email-validator';
import { Email } from '../../domain/value-objetcs/email';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import {
  parseRegistrationCommand,
  RegistrationCommand,
} from '../registration.command';
import { Client, ClientJson } from '../../domain/client';
import { ClientRepository } from '../client.repository';
import { IndividualClientJson } from '../../domain/individual-client';
import { CompanyClientJson } from '../../domain/company-client';

export class RegistrationUseCase {
  constructor(
    private dateProvider: DateProvider,
    private clientRepository: ClientRepository,
    private emailValidator: EmailValidator,
  ) {}

  async handle(command: RegistrationCommand) {
    parseRegistrationCommand(command);

    const existingUser = await this.clientRepository.findByEmail(command.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(command.password, salt);

    const commonFields = {
      id: command.id,
      email: command.email,
      phoneNumber: command.phoneNumber,
      password: hashedPassword,
      createdAt: this.dateProvider.getNow(),
    };

    const client: IndividualClientJson | CompanyClientJson =
      command.type === 'individual'
        ? {
            ...commonFields,
            firstName: command.firstName,
            lastName: command.lastName,
          }
        : { ...commonFields, companyName: command.companyName };

    try {
      await this.clientRepository.save(client as IndividualClient);
      await this.emailValidator.execute(command.email);
    } catch (error) {
      throw error;
    }
  }
}
