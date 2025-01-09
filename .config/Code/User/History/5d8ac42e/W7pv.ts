import { ForgotPasswordService } from './../../../../notification-services/application/forgot-password.service';
import { ValidateTokenUseCase } from '../../application/usecases/validate-token.usecase';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../authentification/framework/guards/jwt-auth.guard';
import { PROVIDERS } from '../../../providers-strings';
import {
  InvalidTokenException,
  TokenExpiredException,
} from '../../errors/invalid-token.exception';
import { ValidationException } from '../../../../../shared/parsing-errors/zod-parsing.handler';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';
import { ForgotPasswordUseCase } from '../../application/usecases/forgot-password.usecase';
import { EmailValidationService } from '../../../../notification-services/emails/application/email-validation.service';
import { ClientRepository } from '../../application/client.repository';
import { Public } from '../../../authentification/framework/public.strategy';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(PROVIDERS.EMAIL_VALIDATION_SERVICE)
    private readonly emailValidationService: EmailValidationService,


    @Inject(PROVIDERS.FORGET_PASSWORD_SERVICE)
    private readonly forgotPasswordService: ForgotPasswordService,


    @Inject(PROVIDERS.CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,

  ) {}

  @Get('/validate-me:token')
  async validateMe(@Request() req, @Query('token') token: string) {
    try {
      const useCase = new ValidateTokenUseCase(this.emailValidationService, this.clientRepository);

      return await useCase.handle({
        id: req.user.sub,
        token,
      });
    } catch (error) {
      if (error.message === 'Invalid token') {
        return new InvalidTokenException();
      } else if (error.message === 'Token expired') {
        return new TokenExpiredException();
      }

      if (error instanceof ValidationException) {
        return new ValidationException([error.message]);
      }
    }
  }

  @Public()
  @Post('/forgot/password:identificator:type')
  async forgotPassword(@Query('type') type: 'email' | 'phone', @Query('identificator') identificator: string) {
    console.log('forgot password');
    try {
      const useCasse = new ForgotPasswordUseCase(this.forgotPasswordService , this.clientRepository);
      return await useCasse.handle({ 
        type,
        identification: identificator,
      });
    } catch (error) {
      return error;
    }
  }

  @Public()
  @Get('/forgot/password/validate:token')
  async validateForgotPasswordToken(@Query('token') token: string) {
    try {
      const tokenData = await this.forgotPasswordService.verifyDigitCode(token);
      return tokenData;
    } catch (error) {
      if (error.message === 'Invalid password-reset token') {
        return new InvalidTokenException();
      }
    }
  }

  @Public()
  @Post('/reset/password')
  async resetPassword() {
    //TODO : Implement this endpoint
  }
}
