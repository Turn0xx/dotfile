import { PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";
import { ValidationException, mapValidationErrors } from "./zod-parsing.handler";

export class ZodValidationPipe implements PipeTransform {
  constructor({schema: ZodType<any> , customParser?: (data: any) => unknown} : any) {}

  transform(value: any) {

    console.log('value in pipe', value);

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