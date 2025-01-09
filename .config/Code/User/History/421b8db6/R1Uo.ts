import { error } from 'console';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  DomainVoValidationError,
  DomainVoValidationException,
} from '../../pocket-ticket/client/identity/errors/domain-invalid-vo.error';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Argument } from '@swc/core';
import { FastifyReply } from 'fastify';

@Catch(DomainVoValidationError)
export class DomainVoValidationFilter implements ExceptionFilter {
  catch(error: DomainVoValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const exp = new DomainVoValidationException(error);

    response.status(exp.getStatus()).send(exp.getResponse());
  }
}
