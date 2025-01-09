type ParsingError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}



interface ParsingHandler {
    handle(error: ParsingError[]): void;
}


class ZodParsingHandler implements ParsingHandler {

    handle(error: ParsingError[]): void {
      let retError

      error.map((err) => {
        retError.push({
          code: err.code,
          expected: err.expected,
          received: err.received,
          path: err.path,
          message: err.message
        });
      });


        throw new Error('Invalid data');
    }

}


class ZodParsingError extends Error {
    constructor(public error: ParsingError[]) {
        super('Invalid data');
    }
}