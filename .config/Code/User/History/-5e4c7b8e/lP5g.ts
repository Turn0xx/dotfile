import { ValueObject } from '../../application/value-object.base';

export class PhoneNumber extends ValueObject<string> {
  private constructor(private readonly phoneNumber: string) {
    super(phoneNumber);
  }

  static fromValue(
    phoneNumber: unknown,
  ): PhoneNumber {
    if (validator) {
      if (!validator(phoneNumber)) {
        throw new Error('Invalid phone number');
      }
    } else {
      console.warn('No validator was provided for phone number');
    }

    return new PhoneNumber(phoneNumber as string);
  }
}
