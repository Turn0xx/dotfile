import { PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";
import { ValidationException, mapValidationErrors } from "./zod-parsing.handler";

export class ZodValidationPipe implements PipeTransform {
  // constructor(private schema: ZodType<any> , private customParser?: (data: any) => unknown) {}

  constructor(private options: {
    schema,
    customParser
  } : {schema?: ZodType<any>, customParser?: (data: any) => unknown}) {}

  transform(value: any) {

    if (this.customParser !== undefined) {
      return this.customParser(value);
    }

    const result = this.schema.parse(value);

    if (result.success ) {
      return value;
    } else  {
      throw new ValidationException(mapValidationErrors(result['error'].issues));
    }
  }
}