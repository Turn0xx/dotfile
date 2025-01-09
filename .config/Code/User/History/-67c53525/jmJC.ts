import { Email } from '../../../../shared/bases/value-objects/email';
import { Password } from '../../../../shared/bases/value-objects/password';
import { PhoneNumber } from '../../../../shared/bases/value-objects/phone-number';
import { IndividualClient, IndividualClientJson } from './individual-client';
import { ClientSchema } from '../../../infrastructure/client.schema';
import { CompanyClientJson } from './company-client';
import { DomainVoValidationError } from '../errors/domain-invalid-vo.error';

export type ClientJson = {
  id: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  isVerified: boolean;
};

export abstract class Client {
  protected constructor(
    protected readonly id: string,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly createdAt: Date,
    protected isVerified: boolean,
  ) {}

  abstract toJson(): ClientJson;

  // static fromJson(json: ClientJson): Client {};

  // static fromDataModel(dataModel: ClientSchema): Client;

  abstract toDataModel(): ClientSchema;

  protected static validateValueObjects(
    json: CompanyClientJson | IndividualClientJson,
  ): void {
    if (!PhoneNumber.validator(json.phoneNumber)) {
      throw new DomainVoValidationError(
        'Client',
        'PhoneNumber',
        'Invalid phone number',
      );
    }

    if (!Email.validator(json.email)) {
      throw new DomainVoValidationError('Client', 'Email', 'Invalid email');
    }

    if (!Password.validator(json.password)) {
      throw new DomainVoValidationError(
        'Client',
        'Password',
        'Invalid password',
      );
    }
  }

  verify(): void {
    this.isVerified = true;
  }

  get Id(): string {
    return this.id;
  }

  get Email(): string {
    return this.email.unpack();
  }

  get IsVerified(): boolean {
    return this.isVerified;
  }

  get PhoneNumber(): string {
    return this.phoneNumber.unpack();
  }

  public changePassword(password: string) {
    this.password = Password.fromValue(password);
  }
}
