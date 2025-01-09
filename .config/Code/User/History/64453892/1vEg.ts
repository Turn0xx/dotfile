import { ClientSchema } from './../../../infrastructure/client.schema';
import { last } from "rxjs";
import { Client, ClientJson } from "./client";
import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export class IndividualClient implements Client {

  constructor(
    private readonly id,
    private email,
    private password,
    private phoneNumber,
    private createdAt,
    private firstName,
    private lastName,
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