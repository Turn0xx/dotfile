import { HttpException } from '@nestjs/common';
import { ClientNotFoundError } from './client-not-found.error';
export class ClientNotFoundError extends Error {
  constructor() {
    super('Client not found');
    this.name = 'ClientNotFoundError';
    Object.setPrototypeOf(this, ClientNotFoundError.prototype);
  }
}

export class ClientNotFoundExceptio extends HttpException {
  constructor() {
    super();
    this.name = 'ClientNotFoundException';
    Object.setPrototypeOf(this, ClientNotFoundException.prototype);
  }
}