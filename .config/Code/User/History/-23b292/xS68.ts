import { Password } from './value-objetcs/password';
import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Client, ClientJson } from './client';
import { Email } from './value-objetcs/email';
import { PhoneNumber } from './value-objetcs/phone-number';


export type CompanyClientJson = ClientJson & { companyName: string };


export class CompanyClient extends Client {
  constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected createdAt: Date,
    protected companyName: string,
  ) {
    super(id, email, password, phoneNumber, createdAt);
  }


  toJson(): ClientJson {


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