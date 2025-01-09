import { Email, Password, PhoneNumber } from '@shared/bases/value-objects';
import { CompanyDataModel, AccountTypeEnum, ClientSchema } from '../../../infrastructure/client.schema';
import { Client, ClientJson } from './client';
import { Type } from 'class-transformer';


export type CompanyClientJson = ClientJson & { companyName: string };


export class CompanyClient extends Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected createdAt: Date,
    protected companyName: string,
    protected isVerified: boolean,
  ) {
    super(id, email, password, phoneNumber, createdAt , isVerified);
  }


  toJson(): CompanyClientJson {
    return {
      id: this.id,
      email: this.email.unpack(),
      password: this.password.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
      companyName: this.companyName,
      isVerified: this.isVerified,
    };
  }

  static fromJson(json: CompanyClientJson): CompanyClient {
    return new CompanyClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.companyName,
      json.isVerified,
    );
  }

  static fromJsonToDataModel(json: CompanyClientJson): CompanyDataModel {
    return {
      id: json.id,
      email: json.email,
      password: json.password,
      phoneNumber: json.phoneNumber,
      createdAt: json.createdAt,
      companyName: json.companyName,
      accountType: AccountTypeEnum.COMPANY,
      isVerified: json.isVerified,
    };
  }

  static fromDataModel(dataModel: ClientSchema): CompanyClient {
    return new CompanyClient(
      dataModel.id,
      Email.fromValue(dataModel.email),
      Password.fromValue(dataModel.password),
      PhoneNumber.fromValue(dataModel.phoneNumber),
      dataModel.createdAt,
      dataModel.companyName,
      dataModel.isVerified,
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
      accountType: AccountTypeEnum.COMPANY,
      isVerified: this.isVerified,
    };
  }
}