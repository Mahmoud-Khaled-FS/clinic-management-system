import { ErrorRequestHandler } from 'express';
import logger from '../../config/logger';

class ServerError extends Error {
  public code: number = 500;

  constructor(message: string, code?: number) {
    super(message);
    if (code) {
      this.code = code;
    }
  }

  static middleware(): ErrorRequestHandler {
    return async (err: ServerError, _, res, __) => {
      let code = err.code;
      if (!err.code || !(err instanceof ServerError)) {
        code = 500;
      }
      logger.error(err.message);
      res.status(code).json({ message: err.message, code: code });
    };
  }
}

export default ServerError;
