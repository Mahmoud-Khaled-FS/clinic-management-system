import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Validate } from '../decorators/validate_body';
import { loginBodyValidation } from '../validations/auth.valid';
import AuthService from '../services/auth';

@Controller()
class Auth {
  @Validate(loginBodyValidation)
  public async login(req: Request, res: Response) {
    const user = await AuthService.login(req.body);
    res.status(200).json(user);
  }
}

export default new Auth();
