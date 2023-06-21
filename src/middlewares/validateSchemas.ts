import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodTypeAny, z, ZodError } from 'zod';
import { objIsEmpty } from '../utils/tool';
import { badRequest } from '../utils/throwErrors';

type SafeParseResult<T extends ZodTypeAny> =
  | {
      success: true;
      data: z.infer<T>;
    }
  | {
      success: false;
      error: ZodError;
    };

export default function validateSchemas<T extends ZodTypeAny>(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (objIsEmpty(req.body)) throw badRequest('Campos preenchido incorretamente!');

    const result: SafeParseResult<T> = schema.safeParse(req.body);

    if (!result.success) {
      if (result.error.errors[0].code === 'invalid_type') {
        throw badRequest('Campos preenchido incorretamente!');
      }

      throw { type: result.error.errors[0].code, message: result.error.errors[0].message };
    }

    next();
  };
}
