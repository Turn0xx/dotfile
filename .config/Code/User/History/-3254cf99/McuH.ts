export class DuplicateFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} already exists`);
    this.name = 'DuplicateFieldError';
    Object.setPrototypeOf(this, DuplicateFieldError.prototype);
  }
}

export class EmailAlreadyExistsError extends DuplicateFieldError {
  constructor() {
    super('email');
    this.name = 'EmailAlreadyExistsError';
    Object.setPrototypeOf(this, EmailAlreadyExistsError.prototype);
  }
}