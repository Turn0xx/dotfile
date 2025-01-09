import { ClientSchema } from 'src/pocket-ticket/infrastructure/client.schema';
import { Client, ClientJson } from './client';

export type CompanyClientJson = ClientJson & { companyName: string };


export class CompanyClient extends Client {
  constructor(
    protected readonly id,
    protected email,
    protected password,
    protected phoneNumber,
    protected createdAt,
    protected companyName,
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
