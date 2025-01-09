import { phoneValidator } from '../../../../../shared/bases/value-objects/validators/phone.validator';
import { ValueObject } from '../../../../../shared/bases/value-object.base';

export class PhoneNumber extends ValueObject<string> {
  static validator = phoneValidator

  private constructor(private readonly phoneNumber: string) {
    super(phoneNumber);
  }

  static fromValue(
    phoneNumber: unknown,
  ): PhoneNumber {
    if (this.validator) {
      if (!this.validator(phoneNumber)) {
        throw new Error('Invalid phone number');
      }
    } else {
      console.warn('No validator was provided for phone number');
    }

    return new PhoneNumber(phoneNumber as string);
  }
}
