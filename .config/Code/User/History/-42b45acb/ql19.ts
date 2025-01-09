


export abstract class ValueObject<Primitive> {

  public validator: (value: unknown) => boolean;

  constructor(private readonly value: Primitive , validator?: (value: unknown) => boolean) {
    if (validator) {
      this.validator = validator;
    }
  }

  unpack(): Primitive {
    return this.value;
  }

  equals(value: ValueObject<Primitive>): boolean {
    return this.value === value.toString();
  }
}