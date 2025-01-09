import { emailValidator } from '../../application/validators/email.validator';
import { ValueObject } from '../../../../../shared/bases/value-object.base';

export class Email extends ValueObject<string> {

  static validator = emailValidator

  private constructor(email: string) {
    super(email);
  }

  static fromValue(
    email: unknown,
  ): Email {
    if (this.validator) {
      if (!this.validator(email)) {
        throw new Error('Invalid email');
      }
    } else {
      console.warn('No validator was provided for email');
    }

    return new Email(email as string);
  }
}
