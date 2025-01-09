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



    
    try {
      const existingUser = await this.clientRepository.findByEmail(command.email);
      if (existingUser) {
        return new EmailAlreadyExistsError();
      }
    } catch (error) {
      console.log(error);
      return error;
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
    console.log('commonFields', commonFields);

    const client: IndividualClientJson | CompanyClientJson =
      command.type === 'individual'
        ? {
            ...commonFields,
            firstName: command.firstName,
            lastName: command.lastName, 
          }
        : { ...commonFields, companyName: command.companyName };

    try {
      console.log('client', client);
      await this.clientRepository.insert(
        command.type === 'individual'
          ? IndividualClient.fromJsonToDataModel(client as IndividualClientJson)
          : CompanyClient.fromJsonToDataModel(client as CompanyClientJson),
      );
      await this.emailValidator.execute(command.email);

    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
