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
  Put,
  Patch,
  HttpCode,
  HttpStatus,
  UseFilters,
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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from '../../../../../shared/parsing-errors/zod.pipe';
import { TokenValidationSchema } from '../../application/commands/token-validation.command';
import { DomainVoValidationError } from '../../errors/domain-invalid-vo.error';
import { DomainVoValidationFilter } from '../../../../../shared/framework/domain-error.filter';

@Controller('identity')
@ApiTags('Client Identity')
export class IdentityController {
  constructor(
    @Inject(PROVIDERS.EMAIL_VALIDATION_SERVICE)
    private readonly emailValidationService: EmailValidationService,


    @Inject(PROVIDERS.FORGET_PASSWORD_SERVICE)
    private readonly forgotPasswordService: ForgotPasswordService,


    @Inject(PROVIDERS.CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,

  ) {}

  @ApiBearerAuth()
  @ApiQuery({ name: 'token', required: true })
  @Patch('/validate-me:token')
  @HttpCode(HttpStatus.OK)
  @UseFilters(new DomainVoValidationFilter())
  async validateMe(@Request() req, @Query('token' , new ZodPipe({
    schema: TokenValidationSchema
  })) token: string) {
    try {
      const useCase = new ValidateTokenUseCase(this.emailValidationService, this.clientRepository);

      return await useCase.handle({
        id: req.user.sub,
        token,
      });
    } catch (error) {
      console.log('error in validate me');
      console.log(error);
      if (error.message === 'Invalid token') {
        return new InvalidTokenException();
      } else if (error.message === 'Token expired') {
        return new TokenExpiredException() = 
      }

      if (error instanceof ValidationException) {
        return new ValidationException([error.message]);
      }
    }
  }

  @ApiQuery({ name: 'identificator', required: true })
  @ApiQuery({ name: 'type', required: true })
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

  @ApiQuery({ name: 'token', required: true })
  @Public()
  @Post('/forgot/password/validate:token')
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
