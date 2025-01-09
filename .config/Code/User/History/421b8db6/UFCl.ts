import { error } from 'console';
import { ArgumentsHost, Catch } from "@nestjs/common";
import { DomainVoValidationError } from "../../pocket-ticket/client/identity/errors/domain-invalid-vo.error";
import { Argument } from '@swc/core';

@Catch(DomainVoValidationError)
export class DomainVoValidationFilter {
  catch(error: DomainVoValidationError , host: ArgumentsHost) {
    
  }
}