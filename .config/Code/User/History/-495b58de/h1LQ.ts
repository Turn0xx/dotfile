import { phoneValidator } from './validators/phone.validator';
import { ValueObject } from '../value-object.base';
import { DomainVoValidationError } from '../../../pocket-ticket/client/identity/errors/domain-invalid-vo.error';

export class PhoneNumber extends ValueObject<string> {
  static validator = phoneValidator;

  private constructor(private readonly phoneNumber: string) {
    super(phoneNumber);
  }

  static fromValue(phoneNumber: unknown): PhoneNumber {
    if (this.validator) {
      if (!this.validator(phoneNumber)) {
        throw new Error('Invalid phone number');

        throw new DomainVoValidationError
      }
    } else {
      console.warn('No validator was provided for phone number');
    }

    return new PhoneNumber(phoneNumber as string);
  }
}
