import { error } from 'console';
import { Catch } from "@nestjs/common";
import { DomainVoValidationError } from "../../pocket-ticket/client/identity/errors/domain-invalid-vo.error";

@Catch(DomainVoValidationError)
export class DomainVoValidationFilter {
  catch(error: DomainVoValidationError) {
    
  }
}