export class DuplicateFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} already exists`);
  }
}