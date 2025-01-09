import { Client } from "./client";
import { Email } from "./value-objetcs/email";

export class IndividualClient extends Client {
  constructor(
    id: number,
    email: Email,
    password: ,
    phoneNumber: string,
    createdAt: Date,
  ) {
    super(id, email, password, phoneNumber, createdAt);
  }
}