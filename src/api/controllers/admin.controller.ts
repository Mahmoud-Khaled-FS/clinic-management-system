import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Validate } from '../decorators/validate_body';
import { employeeBodyValidation } from '../validations/employee.valid';

@Controller()
class Admin {
  @Validate(employeeBodyValidation)
  public async createManager(__: Request, res: Response) {
    res.send('ok');
  }
}

export default new Admin();
