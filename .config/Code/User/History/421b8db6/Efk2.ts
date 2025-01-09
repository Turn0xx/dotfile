import { error } from 'console';
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { DomainVoValidationError, DomainVoValidationException } from "../../pocket-ticket/client/identity/errors/domain-invalid-vo.error";
import {  } from '@nestjs/platform-fastify'
import { Argument } from '@swc/core';

@Catch(DomainVoValidationError)
export class DomainVoValidationFilter implements ExceptionFilter {
  catch(error: DomainVoValidationError , host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Fast>();
    const request = ctx.getRequest<Request>();

    const exp = new DomainVoValidationException(error);

    response.send;


  }
}