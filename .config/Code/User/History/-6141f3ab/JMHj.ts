import {
  ClientDataModel,
  ClientSchema,
  IndividualDataModel,
  AccountTypeEnum,
} from '../../../infrastructure/client.schema';
import { last } from 'rxjs';
import { Client, ClientJson } from './client';
import { Email } from '../../../../shared/bases/value-objects/email';
import { Password } from '../../../../shared/bases/value-objects/password';
import { PhoneNumber } from '../../../../shared/bases/value-objects/phone-number';

export type IndividualClientJson = ClientJson & {
  firstName: string;
  lastName: string;
};

export class IndividualClient extends Client {
  constructor(
    protected readonly id: string,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected createdAt: Date,
    protected firstName: string,
    protected lastName: string,
    protected isVerified: boolean,
  ) {
    super(id, email, password, phoneNumber, createdAt, isVerified);
  }

  toJson(): IndividualClientJson {
    return {
      id: this.id,
      email: this.email.unpack(),
      password: this.password.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
      firstName: this.firstName,
      lastName: this.lastName,
      isVerified: this.isVerified,
    };
  }

  static fromJson(json: IndividualClientJson): IndividualClient {
    return new IndividualClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.firstName,
      json.lastName,
      json.isVerified,
    );
  }

  static fromJsonToDataModel(json: IndividualClientJson): IndividualDataModel {
    return {
      id: json.id,
      email: json.email,
      password: json.password,
      phoneNumber: json.phoneNumber,
      createdAt: json.createdAt,
      firstName: json.firstName,
      lastName: json.lastName,
      accountType: AccountTypeEnum.INDIVIDUAL,
      isVerified: json.isVerified,
    };
  }

  static fromDataModel(dataModel: ClientSchema): IndividualClient {
    return new IndividualClient(
      dataModel.id,
      Email.fromValue(dataModel.email),
      Password.fromValue(dataModel.password),
      PhoneNumber.fromValue(dataModel.phoneNumber),
      dataModel.createdAt,
      dataModel.firstName,
      dataModel.lastName,
      dataModel.isVerified,
    );
  }

  toDataModel(): IndividualDataModel {
    return {
      id: this.id,
      email: this.email.unpack(),
      password: this.password.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
      firstName: this.firstName,
      lastName: this.lastName,
      isVerified: this.isVerified,
      accountType: AccountTypeEnum.INDIVIDUAL,
    };
  }
}
