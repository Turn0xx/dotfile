import { ClientSchema } from './../../../infrastructure/client.schema';
import { last } from 'rxjs';
import { Client, ClientJson } from './client';
import { Email } from './value-objetcs/email';
import { Password } from './value-objetcs/password';
import { PhoneNumber } from './value-objetcs/phone-number';

export type IndividualClientJson = ClientJson & {
  firstName: string;
  lastName: string;
};

export class IndividualClient extends Client {
  constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected createdAt: Date,
    protected firstName: string,
    protected lastName: string,
  ) {
    super(id, email, password, phoneNumber, createdAt);
  }

  toJson(): IndividualClientJson {
    return {
      id: this.id,
      email: this.email.toString(),
      password: this.password.toString(),
      phoneNumber: this.phoneNumber.toString(),
      createdAt: this.createdAt,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
  fromJson(json: ClientJson): Client {
    throw new Error('Method not implemented.');
  }
  fromDataModel(dataModel: ClientSchema): Client {
    throw new Error('Method not implemented.');
  }
  toDataModel(): ClientSchema {
    throw new Error('Method not implemented.');
  }
}
