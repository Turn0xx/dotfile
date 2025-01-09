import { ValueObject } from '../../application/value-object.base';

export class Password extends ValueObject<string> {

  static validator = 

  private constructor(password: string) {
    super(password);
  }

  static fromValue(
    password: unknown,
    validator?: (value: unknown) => boolean,
  ): Password {
    if (validator) {
      if (!validator(password)) {
        throw new Error('Invalid password');
      }
    } else {
      console.warn('No validator was provided for password');
    }

    return new Password(password as string);
  }
}