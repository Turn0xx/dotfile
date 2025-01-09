import { DateProvider } from '../../domain/date-provider';
import * as bcrypt from 'bcrypt';
import { EmailValidator } from 'src/pocket-ticket/emails/application/email-validator';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import {
  parseRegistrationCommand,
  RegistrationCommand,
} from '../registration.command';
import { ClientRepository } from '../client.repository';
import {
  IndividualClient,
  IndividualClientJson,
} from '../../domain/individual-client';
import { CompanyClient, CompanyClientJson } from '../../domain/company-client';
import { retry } from 'rxjs';

export class RegistrationUseCase {
  constructor(
    private dateProvider: DateProvider,
    private clientRepository: ClientRepository,
    private emailValidator: EmailValidator,
  ) {}

  async handle(command: RegistrationCommand) {
    try {
      parseRegistrationCommand(command);
    } catch (error) {
      return error;
    }




    const existingUser = await this.clientRepository.findByEmail(command.email);

    console.log(existingUser);

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
      isVerified: false,
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
      await this.clientRepository.insert(
        command.type === 'individual'
          ? IndividualClient.fromJsonToDataModel(client as IndividualClientJson)
          : CompanyClient.fromJsonToDataModel(client as CompanyClientJson),
      );
      await this.emailValidator.execute(command.email);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
