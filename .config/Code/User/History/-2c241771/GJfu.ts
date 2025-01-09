type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

interface ParsingHandler {
  handle(error: ParsingError[]): void;
}

class ZodParsingHandler implements ParsingHandler {
  static handle(error: ParsingError[]): void {
    throw new ZodParsingError(error);
  }
}

class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super('Invalid data');
  }
}
