import { ClientSchema } from './../../../infrastructure/client.schema';
import { last } from "rxjs";
import { Client, ClientJson } from "./client";
import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export class IndividualClient extends Client {

  constructor(
    private readonly id: number,
    private email: Email,
    private password: Password,
    private phoneNumber: PhoneNumber,
    private createdAt: Date,
    private firstName: string,
    private lastName: string,
  ) {
    super(this.id, email, password, phoneNumber, createdAt);
  }

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