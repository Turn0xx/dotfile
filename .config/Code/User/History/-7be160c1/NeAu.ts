import { ValidateTokenUseCase } from './../usecases/validate-token.usecase';
import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { PROVIDERS } from '../../../providers-strings';
import { InvalidTokenException } from '../../errors/invalid-token.exception';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(PROVIDERS.VALIDATE_TOKEN_USE_CASE)
    private readonly validateTokenUseCase: ValidateTokenUseCase,
  ) {}

  @UseGuards(AuthGuard)
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
      }
      return error;
    }
  }
}
