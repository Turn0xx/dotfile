import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistException extends HttpException {
  constructor(error?: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: 'Email already exists',
        error,
      },
      HttpStatus.CONFLICT,
    );
  }
}
