import { addressValidator } from '../../../../../shared/bases/value-objects/validators/adress.validator';
import { ValueObject } from '../../../../../shared/bases/value-object.base';

export class Address extends ValueObject<string> {

  static validator = addressValidator;

  private constructor(address: string) {
    super(address);
  }

  static fromValue(
    address: unknown,
  ): Address {
    if (this.validator) {
      if (!this.validator(address)) {
        throw new Error('Invalid address');
      }
    } else {
      console.warn('No validator was provided for address');
    }

    return new Address(address as string);
  }
}
