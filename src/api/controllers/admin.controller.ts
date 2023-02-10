import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Validate } from '../decorators/validate_body';
import { employeeBodyValidation } from '../validations/employee.valid';
import AdminService from '../services/admin';

@Controller()
class Admin {
  @Validate(employeeBodyValidation)
  public async createManager(req: Request, res: Response) {
    const manager = await AdminService.createManager(req.body);
    return res.status(201).json(manager);
  }
}

export default new Admin();
