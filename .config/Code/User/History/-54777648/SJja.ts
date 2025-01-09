import { PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";
import { ValidationException, mapValidationErrors } from "./zod-parsing.handler";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<any> , customParser?: (data: any) => unknown) {}

  transform(value: any) {

    if (this.customParser) {
      return this.customParser(value);
    }

    const result = this.schema.parse(value);

    if (result.success ) {
      return value;
    } catch (error) {
      throw new ValidationException(mapValidationErrors(error.errors));
    }
  }
}