import { ErrorRequestHandler } from 'express';

class ServerError extends Error {
  public code: number = 500;

  constructor(message: string, code?: number) {
    super(message);
    if (code) {
      this.code = code;
    }
  }

  static middleware(): ErrorRequestHandler {
    return (err: ServerError, _, res, __) => {
      res.status(err.code).json({ message: err.message, code: err.code });
    };
  }
}

export default ServerError;
