import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: Date;
};


export abstract class Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly  createdAt: Date,
  ) {}


  abstract toJson(): ClientJson 

  toDataModel(): any {
    throw new Error('Method not implemented.');
  }

  static fromJson(json: ClientJson): Client {
    throw new Error('Method not implemented.');
  }

  static fromDataModel(dataModel: any): Client {
    throw new Error('Method not implemented.');
  }

}