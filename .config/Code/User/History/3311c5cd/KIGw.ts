import { HttpException, HttpStatus } from '@nestjs/common';
export class ClientNotFoundError extends Error {
  constructor() {
    super('Client not found');
    this.name = 'ClientNotFoundError';
    Object.setPrototypeOf(this, ClientNotFoundError.prototype);
  }
}

export class ClientNotFoundExceptio extends HttpException {
  constructor() {
    super('Client not found', HttpStatus.NOT_FOUND);
  }
}
