import { CompanyDataModel } from './../../../infrastructure/client.schema';
import { Password } from './value-objetcs/password';
import { Client, ClientJson } from './client';
import { Email } from './value-objetcs/email';
import { PhoneNumber } from './value-objetcs/phone-number';
import { ClientSchema, ClientDataModel } from 'src/pocket-ticket/infrastructure/client.schema';


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


  toJson(): CompanyClientJson {
    return {
      id: this.id,
      email: this.email.toString(),
      password: this.password.toString(),
      phoneNumber: this.phoneNumber.toString(),
      createdAt: this.createdAt,
      companyName: this.companyName,
    };
  }

  fromJson(json: CompanyClientJson): CompanyClient {
    return new CompanyClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.companyName,
    );
  }
  fromDataModel(dataModel: ClientSchema): CompanyClient {
    return new CompanyClient(
      dataModel.id,
      Email.fromValue(dataModel.email),
      Password.fromValue(dataModel.password),
      PhoneNumber.fromValue(dataModel.phoneNumber),
      dataModel.createdAt,
      dataModel.companyName,
    );
  }

  toDataModel(): CompanyDataModel {
    return {
      id: this.id,
      email: this.email.toString(),
      password: this.password.toString(),
      phoneNumber: this.phoneNumber.toString(),
      companyName: this.companyName,
      createdAt: this.createdAt,
    };
  }
}
