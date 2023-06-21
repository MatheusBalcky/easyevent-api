import { Request, Response, NextFunction } from 'express';

interface Ierror {
  type: 'unauthorized' | 'conflict' | 'not_found' | 'bad_request' | 'invalid_string' | 'invalid_type';
  message: string;
}

const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400,
  invalid_string: 400,
  too_small: 401,
  invalid_type: 400
};

export async function errorHandler(err: Ierror, req: Request, res: Response, next: NextFunction) {
  let statusCode: number = ERRORS[err.type];
  if (!statusCode) {
    statusCode = 500;
    console.log({ ...err, time: new Date() });
    return res.sendStatus(statusCode); // internal server error
  }

  return res.status(statusCode).send(err);
}
