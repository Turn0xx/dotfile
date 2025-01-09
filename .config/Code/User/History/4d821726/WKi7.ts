import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Invalid token', HttpStatus.FORBIDDEN);
  }
}

export class TokenExpiredException extends HttpException {
  constructor() {
    super('Token expired', HttpStatus.FORBIDDEN);
  }
}