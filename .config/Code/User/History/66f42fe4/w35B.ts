import { ValueObject } from "../../application/value-object.base";

export class Email extends ValueObject<string>{
  private constructor(email: string) {
    super(email);
  }

  static fromValue(email: unknown , validator ?: (value: unknown) => boolean): Email {

    if (validator) {
      if (!validator(email)) {
        throw new Error('Invalid email');
      }
    }

    return new Email(email as string);
  }
}