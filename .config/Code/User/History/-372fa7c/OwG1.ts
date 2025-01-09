import { addressValidator } from '../../application/validators/adress.validator';
import { ValueObject } from '../../application/value-object.base';

export class Address extends ValueObject<string> {

  private constructor(address: string) {
    super(address , addressValidator);
  }

  static fromValue(
    address: unknown,
  ): Address {
    if (validator) {
      if (!validator(address)) {
        throw new Error('Invalid address');
      }
    } else {
      console.warn('No validator was provided for address');
    }

    return new Address(address as string);
  }
}
