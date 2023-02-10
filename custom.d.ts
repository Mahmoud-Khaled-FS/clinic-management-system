import User from './src/api/models/employee.model';

export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      user?: User;
    }
  }
}
