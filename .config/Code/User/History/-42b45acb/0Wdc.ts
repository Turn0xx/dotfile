
export abstract class ValueObject<Primitive> {

  protected validator?: (value: unknown) => boolean;

  constructor(private readonly value: Primitive , validator) {}

  unpack(): Primitive {
    return this.value;
  }

  equals(value: ValueObject<Primitive>): boolean {
    return this.value === value.toString();
  }
}