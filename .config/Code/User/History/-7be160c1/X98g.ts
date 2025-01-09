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
      console.log('token', token);
      return await this.validateTokenUseCase.handle({
        id: req.user.sub,
        token,
      });
    } catch (error) {
      console.log('error in the controller', error);
      return error;
    }
  }
}
