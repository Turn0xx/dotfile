import { HttpException } from '@nestjs/common';

export class EmailAlreadyExistException extends HttpException {
  constructor() {
    
  }
}
