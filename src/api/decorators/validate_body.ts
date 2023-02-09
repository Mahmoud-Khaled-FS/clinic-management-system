import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import ServerError from '../util/errors';

export const Validate = (validation: z.ZodObject<any>) => {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;
    descriptor.value = (...args: any) => {
      const [req] = args;
      const validatedBody = validation.safeParse(req.body);
      if (!validatedBody.success) {
        const message = fromZodError(validatedBody.error).message;
        throw new ServerError(message, 400);
      }
      return fn.apply(this, args);
    };
    return descriptor;
  };
};
