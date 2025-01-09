
export abstract class ValueObject<Primitive> {

  

  constructor(private readonly value: Primitive) {}

  unpack(): Primitive {
    return this.value;
  }

  equals(value: ValueObject<Primitive>): boolean {
    return this.value === value.toString();
  }
}