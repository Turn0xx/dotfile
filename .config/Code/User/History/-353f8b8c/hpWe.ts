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
      const dataModel = command.type === 'individual'
        ? IndividualClient.fromJson(client as IndividualClientJson).toDataModel()
        : CompanyClient.fromJson(client as CompanyClientJson).toDataModel();

      const clientData: ClientSchema = {
        ...dataModel,
        isVerified: false,
        updatedAt: this.dateProvider.getNow(),
      };

      await this.clientRepository.insert(clientData);
      await this.emailValidator.execute(command.email);
    } catch (error) {
      throw error;
    }
  }
}
