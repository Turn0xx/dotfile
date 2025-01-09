import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('identity')
export class IdentityController {
  constructor() {}

  @UseGuards(AuthGuard) 
  @Get('/validate-me:token')
  async validateMe() {
    return 'Hello World';
  }
}