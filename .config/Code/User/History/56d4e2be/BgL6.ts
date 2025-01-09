import { Email } from './value-objetcs/email';
import { Password } from './value-objetcs/password';
import { PhoneNumber } from './value-objetcs/phone-number';
import { IndividualClient, IndividualClientJson } from './individual-client';

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  isVerified: boolean;
};

export abstract class Client {

  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly createdAt: Date,
    protected isVerified: boolean
  ) {}

  abstract toJson(): ClientJson;

  // static fromJson(json: ClientJson): Client {};

  // static fromDataModel(dataModel: ClientSchema): Client;

  abstract toDataModel(): Partial<ClientSchema>;

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
