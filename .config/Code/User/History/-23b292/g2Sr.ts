import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Client, ClientJson } from './client';

export class CompanyClient implements Client {
  constructor(
    private readonly id,
    email,
    password,
    phoneNumber,
    createdAt,
    organizationName,
    organizationAddress,
    username,
  ) {}
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
  toJson(): ClientJson {
    throw new Error('Method not implemented.');
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
  static fromJson(json) {
    return new CompanyClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.organizationName,
      json.organizationAddress,
      json.username,
    );
  }
}
