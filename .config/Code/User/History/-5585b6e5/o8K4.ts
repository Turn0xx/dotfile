import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainVoValidationError extends Error {
  public voName;
  public domain;

  constructor(domain: string, voName: string, message: string) {
    super(message);
    this.name = 'DomainVoValidationError';
    this.voName = voName;
    this.domain = domain;
  }
}

export class DomainVoValidationException extends HttpException {
  constructor(domainError: DomainVoValidationError) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: domainError.message,
        error: {
          domain: domainError.domain,
          voName: domainError.voName,
          message: domainError.message,
        },
      },

      HttpStatus.BAD_REQUEST
    )
  }
}
