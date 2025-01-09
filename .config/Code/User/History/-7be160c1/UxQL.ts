import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('identity')
export class IdentityController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('/validate-me:token')
  async validateMe(@Query('token') token: string) {
    return 'Hello World';
  }
}
