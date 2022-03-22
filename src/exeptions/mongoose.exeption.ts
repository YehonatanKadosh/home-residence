import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Error } from 'mongoose';

@Catch(Error.ValidationError, Error.CastError)
export class MongooseException implements ExceptionFilter {
  catch(
    exception: Error.ValidationError | Error.CastError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const next = ctx.getNext<NextFunction>();
    const { message, name } = exception;
    next(new BadRequestException(name, message));
  }
}
