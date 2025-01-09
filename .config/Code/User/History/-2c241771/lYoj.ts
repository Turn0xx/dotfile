type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};


class ParsingHandler {
  handle(error: ParsingError[]): void {
    throw new Error("Method not implemented.");
  }

  static mapError(error: ParsingError[]): void {
    throw new ZodParsingError(error);
  }
}

class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super('Invalid data');
  }
}
