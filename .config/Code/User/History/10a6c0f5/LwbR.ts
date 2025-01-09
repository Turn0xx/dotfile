import passport from 'passport';
import { EmailValidationService } from '../../../../emails/application/email-validation.service';
import {
  TokenValidationCommand,
  parseTokenValidationCommand,
} from '../commands/token-validation.command';
import { ClientRepository } from '../repositories/client.repository';

export class ValidateTokenUseCase {
  constructor(
    private emailService: EmailValidationService,
    private clientRepository: ClientRepository,
  ) {}

  async handle(tokenValidationCommand: TokenValidationCommand) {
    console.log('tokenValidationCommand', tokenValidationCommand);
    try {
      parseTokenValidationCommand(tokenValidationCommand);
    } catch (error) {
      throw error;
    }


    try {
      await this.emailService.validateEmail(
        tokenValidationCommand.id,
        tokenValidationCommand.token,
      );

      await this.clientRepository.verifyClient(tokenValidationCommand.id);      
    } catch (error) {
      throw error;
    }
  }
}
