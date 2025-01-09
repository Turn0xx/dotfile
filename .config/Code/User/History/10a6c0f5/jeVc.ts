import { EmailValidationService } from '../../../../emails/application/email-validation.service';
import {
  TokenValidationCommand,
  parseTokenValidationCommand,
} from '../commands/token-validation.command';

export class ValidateTokenUseCase {
  constructor(private emailService: EmailValidationService , private client ) {}

  async handle(tokenValidationCommand: TokenValidationCommand) {
    try {
      parseTokenValidationCommand(tokenValidationCommand);
    } catch (error) {
      return error;
    }

    try {
        await this.emailService.validateEmail(tokenValidationCommand.id, tokenValidationCommand.token);
    } catch (error) {
      return false;
    }
  }
}
