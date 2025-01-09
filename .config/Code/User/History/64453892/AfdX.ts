import { Client } from "./client";
import { Email } from "./value-objetcs/email";
import { Password } from "./value-objetcs/password";
import { PhoneNumber } from "./value-objetcs/phone-number";

export class IndividualClient extends Client {
  constructor(
    id: number,
    email: Email,
    password: Password,
    phoneNumber: PhoneNumber,
    createdAt: Date,
  ) {
    super(id, email, password, phoneNumber, createdAt);
  }
}