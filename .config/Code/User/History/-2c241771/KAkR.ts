type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};



export function mapValidationErrors(errors: ParsingError[]): any[] {
  return errors.map(error => ({
    field: error.path.join('.'),
    message: `${error.message}: expected ${error.expected} but received ${error.received}`,
  }));
}

