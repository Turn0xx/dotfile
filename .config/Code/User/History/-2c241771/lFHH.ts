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

export class ZodParsingError extends Error {
  constructor(public error: ParsingError[]) {
    super(error as unknown as string);
  }
}
