import { DateProvider } from '../../../../../shared/date-provider';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import {
  parseRegistrationCommand,
  RegistrationCommand,
} from '../commands/registration.command';
import { ClientRepository } from '../client.repository';
import {
  IndividualClient,
  IndividualClientJson,
} from '../../domain/individual-client';
import { CompanyClient, CompanyClientJson } from '../../domain/company-client';
import { retry } from 'rxjs';
import { EmailValidationService } from '../../../../notification-services/emails/application/email-validation.service';

export class RegistrationUseCase {
  constructor(
    private dateProvider: DateProvider,
    private clientRepository: ClientRepository,
    private emailValidator: EmailValidationService,
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

    await this.clientRepository.insert(
      command.type === 'individual'
        ? IndividualClient.fromJsonToDataModel(client as IndividualClientJson)
        : CompanyClient.fromJsonToDataModel(client as CompanyClientJson),
    );
    await this.emailValidator.generateEmail(command.id, command.email);
  }
}
