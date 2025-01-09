import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistException extends HttpException {
  constructor(message: string, error?: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message,
        error,
      },
      HttpStatus.CONFLICT,
    );
  }
}
