import { Email } from "./value-objetcs/email";

export abstract class Client {
  protected constructor(
    protected readonly id: number,
    protected email: Email
  )
}