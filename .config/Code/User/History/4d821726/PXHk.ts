import { HttpException } from "@nestjs/common";

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Invalid token', 403);
  }
}