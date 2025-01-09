import { EmailValidationService } from "../../../../emails/application/email-validation.service";

export class ValidateEmailUseCase {
    constructor(emailService: EmailValidationService) {}


    async execute(email: string) {
        
    }

}