import { Email } from '../../../../shared/bases/value-objects/email';
import { Password } from '../../../../shared/bases/value-objects/password';
import { PhoneNumber } from '../../../../shared/bases/value-objects/phone-number';
import { IndividualClient, IndividualClientJson } from './individual-client';
import { ClientSchema } from '../../../infrastructure/client.schema';

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  isVerified: boolean;
};

export abstract class Client {
  changePassword(password: string) {
    throw new Error("Method not implemented.");
  }
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly createdAt: Date,
    protected isVerified: boolean,
  ) {}

  abstract toJson(): ClientJson;

  // static fromJson(json: ClientJson): Client {};

  // static fromDataModel(dataModel: ClientSchema): Client;

  abstract toDataModel(): Partial<ClientSchema>;

  verify(): void {
    this.isVerified = true;
  }

  get Id(): number {
    return this.id;
  }

  get Email(): string {
    return this.email.unpack();
  }

  get IsVerified(): boolean {
    return this.isVerified;
  }
}
