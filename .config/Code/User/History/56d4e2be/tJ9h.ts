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


  toJson(): ClientJson {
    return {
      id: this.id,
      email: this.email.unpack(),
      password: this.password.unpack(),
      phoneNumber: this.phoneNumber.unpack(),
      createdAt: this.createdAt,
    };
  }

}