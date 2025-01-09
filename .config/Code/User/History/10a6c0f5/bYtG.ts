import { parse } from "path";
import { EmailValidationService } from "../../../../emails/application/email-validation.service";
import { TokenValidationCommand, parseTokenValidationCommand } from "../token-validation.command";

export class ValidateTokenUseCase {
    constructor(
        emailService: EmailValidationService
        ) {}









    async execute(tokenValidationCommand: TokenValidationCommand) {

        try {
            parseTokenValidationCommand(tokenValidationCommand);
        } catch (error) {
            
        }




        try {

        } catch (error) {
            return false;
        }
        
    }

}