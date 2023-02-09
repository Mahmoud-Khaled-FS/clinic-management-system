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
      try {
        res.status(err.code).json({ message: err.message, code: err.code });
      } catch (err) {
        logger.error(err.message);
      }
    };
  }
}

export default ServerError;
