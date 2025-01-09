import { ValidateTokenUseCase } from './../usecases/validate-token.usecase';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PROVIDERS } from '../../../providers-strings';
import { InvalidTokenException, TokenExpiredException } from '../../errors/invalid-token.exception';
import { ValidationException } from '../../../../parsing-errors/zod-parsing.handler';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(PROVIDERS.VALIDATE_TOKEN_USE_CASE)
    private readonly validateTokenUseCase: ValidateTokenUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/validate-me:token')
  async validateMe(@Request() req, @Query('token') token: string) {
    try {
      return await this.validateTokenUseCase.handle({
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
}
