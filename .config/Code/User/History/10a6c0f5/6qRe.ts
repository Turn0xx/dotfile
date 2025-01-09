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
    try {
      parseTokenValidationCommand(tokenValidationCommand);
    } catch (error) {
      return error;
    }

    try {
    console.log('tokenValidationCommand', tokenValidationCommand);
      await this.emailService.validateEmail(
        tokenValidationCommand.id,
        tokenValidationCommand.token,
      );

      await this.clientRepository.verifyClient(tokenValidationCommand.id);
    } catch (error) {
      return false;
    }
  }
}
