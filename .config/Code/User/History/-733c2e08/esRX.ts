import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistException extends HttpException {
  constructor(message: string, error?: string) {
    super(
      {
        statusCode: 400,
        message,
        error,
      },
      HttpStatus.BAD,
    );
  }
}
