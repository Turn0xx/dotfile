import { ValueObject } from '../../application/value-object.base';

export class PhoneNumber extends ValueObject<string>{
  private constructor(private readonly phoneNumber: string) {
    super(phoneNumber);
  }

  static fromValue(phoneNumber: unknown , validator ?: (value: unknown) => boolean): PhoneNumber {

    if (validator) {
      if (!validator(phoneNumber)) {
        throw new Error('Invalid phone number');
      }
    }

    return new PhoneNumber(phoneNumber as string);
  }

}