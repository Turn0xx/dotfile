export class ClientNotFoundError extends Error {
  constructor() {
    super('Client not found');
    this.name = 'ClientNotFoundError';
    Object.setPrototypeOf(this, ClientNotFoundError.prototype);
  }
}

export