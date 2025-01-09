import { passwordValidator } from '../../application/validators/password.validator';
import { ValueObject } from '../../../../../shared/bases/value-object.base';

export class Password extends ValueObject<string> {

  static validator = passwordValidator

  private constructor(password: string) {
    super(password);
  }

  static fromValue(
    password: unknown,
  ): Password {
    if (this.validator) {
      if (!this.validator(password)) {
        throw new Error('Invalid password');
      }
    } else {
      console.warn('No validator was provided for password');
    }

    return new Password(password as string);
  }
}
