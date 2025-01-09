import { parse } from "path";
import { EmailValidationService } from "../../../../emails/application/email-validation.service";
import { TokenValidationCommand } from "../token-validation.command";

export class ValidateTokenUseCase {
    constructor(
        emailService: EmailValidationService
        ) {}









    async execute(tokenValidationCommand: TokenValidationCommand) {

        try {
            parseTokenValidationCommand(tokenValidationCommand);
        }




        try {

        } catch (error) {
            return false;
        }
        
    }

}