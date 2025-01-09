import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export type ClientJson = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};


export abstract class Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email,
    protected password: Password,
    protected phoneNumber: PhoneNumber,
    protected readonly  createdAt: Date,
    protected firstName?: string,
    protected lastName?: string,
  ) {}


  toJson(): ClientJson {
    return {
      id: this.id,
      email: this.email.unpack(),
      password: this.password.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

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