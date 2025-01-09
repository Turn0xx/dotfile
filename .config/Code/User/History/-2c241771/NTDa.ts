type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};


class ParsingHandler {
  private static handle(error: ParsingError[]): void {
    throw new ZodParsingError(error);
  }

  static mapError(error: ParsingError[]): void {
    this.handle(error);
  }
}

class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super(error.map((e) => e.message).join('\n'));
  }
}
