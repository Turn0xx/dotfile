type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};


export class ParsingHandler {
  
  static mapError(error: ParsingError[]): void {
    throw new ZodParsingError(error);
  }
}

class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super(error.map((e) => e.message).join('\n'));
  }
}
