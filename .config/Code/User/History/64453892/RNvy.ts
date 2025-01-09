import { last } from "rxjs";
import { Client, ClientJson } from "./client";
import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export class IndividualClient extends Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected firstName: string,
    protected lastName: string,
    protected readonly createdAt: Date,
  ) {
    super(id, email, password, phoneNumber , firstName  , lastName , createdAt);
  }

  static fromJson(json: ClientJson): IndividualClient {
    return new IndividualClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.firstName,
      json.lastName,
      json.createdAt,
    );
  }

  static fromDataModel(dataModel: any): IndividualClient {
    return new IndividualClient(
      dataModel.id,
      Email.fromValue(dataModel.email),
      Password.fromValue(dataModel.password),
      PhoneNumber.fromValue(dataModel.phoneNumber),
      dataModel.createdAt,
    );
  }

}