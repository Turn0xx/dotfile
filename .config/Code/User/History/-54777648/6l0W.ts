import { PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";
import { ValidationException, mapValidationErrors } from "./zod-parsing.handler";

export class ZodValidationPipe implements PipeTransform {
  // constructor(private schema: ZodType<any> , private customParser?: (data: any) => unknown) {}

  private schema: ZodType<any>;
  private customParser?: (data: any) => unknown;

  constructor({
    schema,
    customParser
  } : {schema?: ZodType<any>, customParser?: (data: any) => unknown}) {
    this.schema = schema;
    this.customParser = customParser;
  }

  transform(value: any) {

    if (this.customParser !== undefined) {
      this.customParser(value);
    }

    const result = this.schema.parse(value);

    if (result.success ) {
      return value;
    } else  {
      throw new ValidationException(mapValidationErrors(result['error'].issues));
    }
  }
}