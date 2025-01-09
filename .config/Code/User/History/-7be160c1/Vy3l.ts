import { ValidateTokenUseCase } from './../usecases/validate-token.usecase';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';

@Controller('identity')
export class IdentityController { 
  constructor(@Inject(PROVIDERS. private readonly ValidateTokenUseCase: ValidateTokenUseCase) {}

  @UseGuards(AuthGuard)
  @Get('/validate-me:token')
  async validateMe(@Query('token') token: string) {
    return 'Hello World';
  }
}
