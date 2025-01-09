export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<any>) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      throw new ValidationException(mapValidationErrors(error.errors));
    }
  }
}