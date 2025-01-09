import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Client, ClientJson } from './client';

export class CompanyClient implements Client {
  constructor(
    private readonly id,
    private email,
    private password,
    private phoneNumber,
    private createdAt,
    private companyName,
  ) {}
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
}
