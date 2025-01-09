import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/jwt-auth.guard';

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly tokenVali
  ) {}

  @UseGuards(AuthGuard)
  @Get('/validate-me:token')
  async validateMe(@Query('token') token: string) {
    return 'Hello World';
  }
}
