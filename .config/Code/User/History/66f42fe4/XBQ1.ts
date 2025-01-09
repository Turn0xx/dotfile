import { emailValidator } from '../../application/validators/email.validator';
import { ValueObject } from '../../application/value-object.base';

export class Email extends ValueObject<string> {

  static validator = emailValidator

  private constructor(email: string) {
    super(email);
  }

  static fromValue(
    email: unknown,
    validator?: (value: unknown) => boolean,
  ): Email {
    if (validator) {
      if (!validator(email)) {
        throw new Error('Invalid email');
      }
    } else {
      console.warn('No validator was provided for email');
    }

    return new Email(email as string);
  }
}
