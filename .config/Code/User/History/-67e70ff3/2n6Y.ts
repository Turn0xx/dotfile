export class DuplicateFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} already exists`);
    this.name = 'DuplicateFieldError';
    Object.setPrototypeOf(this, DuplicateFieldError.prototype);
  }
}