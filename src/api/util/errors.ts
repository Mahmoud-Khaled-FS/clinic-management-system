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
      if (!err.code) {
        err.code = 500;
      }
      logger.error(err.message);
      res.status(err.code).json({ message: err.message, code: err.code });
    };
  }
}

export default ServerError;
