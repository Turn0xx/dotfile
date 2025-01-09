import {
  RegistrationCommand,
  UnionSchema,
  parseRegistrationCommand,
} from './../../application/commands/registration.command';
import {
  Body,
  Controller,
  Inject,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RegistrationUseCase } from '../../application/usecases/register.usecase';
import { PROVIDERS } from '../../../providers-strings';
import { EmailAlreadyExistException } from '../../errors/email-already-exist.exception';
import { EmailAlreadyExistsError } from '../../errors/duplicateField.error';
import { Public } from '../../../authentification/framework/public.strategy';
import { DateProvider } from '../../../../../shared/date-provider';
import { EmailValidationService } from '../../../../notification-services/emails/application/email-validation.service';
import { ClientRepository } from '../../application/client.repository';
import { RegistrationDto } from '../dto/registration.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ValidationException } from '../../../../../shared/parsing-errors/zod-parsing.handler';
import { ZodValidationPipe } from '../../../../../shared/parsing-errors/zod.pipe';

@Controller('register')
@ApiTags('Client Registration')
export class RegistrationController {
  constructor(
    @Inject(PROVIDERS.DATE_PROVIDER)
    private readonly dateProvider: DateProvider,

    @Inject(PROVIDERS.CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,

    @Inject(PROVIDERS.EMAIL_VALIDATION_SERVICE)
    private readonly emailValidationService: EmailValidationService,
  ) {}

  @ApiBody({ type: [RegistrationDto] })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async register(
    @Body(
      new ZodValidationPipe({
        customParser: parseRegistrationCommand,
      }),
    )
    command: RegistrationDto,
  ) {
    try {
      const useCase = new RegistrationUseCase(
        this.dateProvider,
        this.clientRepository,
        this.emailValidationService,
      );

      return await useCase.handle(command);
    } catch (error) {
      console.log(error);
      if (error instanceof EmailAlreadyExistsError) {
        throw new EmailAlreadyExistException(error);
      }

      if (error instanceof ValidationException) return error;
    }
  }
}
