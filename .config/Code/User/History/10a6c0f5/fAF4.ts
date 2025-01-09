import { EmailSender } from 'src/pocket-ticket/emails/application/email-sender';
import { Email } from './../../domain/value-objetcs/email';
import { parse } from 'path';
import { EmailValidationService } from '../../../../emails/application/email-validation.service';
import {
  TokenValidationCommand,
  parseTokenValidationCommand,
} from '../token-validation.command';

export class ValidateTokenUseCase {
  constructor(private emailService: EmailValidationService) {}

  async execute(tokenValidationCommand: TokenValidationCommand) {
    try {
      parseTokenValidationCommand(tokenValidationCommand);
    } catch (error) {
      return error;
    }

    try {
        this.emailService.validateEmail(tokenValidationCommand.id, tokenValidationCommand.token);

    } catch (error) {
      return false;
    }
  }
}
