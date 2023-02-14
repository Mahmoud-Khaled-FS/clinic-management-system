import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Validate } from '../decorators/validate_body';
import { employeeBodyValidation } from '../validations/employee.valid';
import AdminService from '../services/admin';
import { adminBodyValidation, permissionBodyValidation } from '../validations/admin.valid';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import ServerError from '../util/errors';

@Controller()
class Admin {
  @Validate(employeeBodyValidation)
  async createManager(req: Request, res: Response) {
    const manager = await AdminService.createManager(req.body);
    return res.status(201).json(manager);
  }
  @Validate(adminBodyValidation)
  @Guard({ permissions: Permission.ALL })
  async addAdmin(req: Request, res: Response) {
    const id = req.body.employeeId;
    const user = await AdminService.addAdmin(id);
    res.status(200).json(user);
  }
  @Validate(adminBodyValidation)
  @Guard({ permissions: Permission.ALL })
  async removeAdmin(req: Request, res: Response) {
    const id = req.body.employeeId;
    const user = await AdminService.removeAdmin(id);
    res.status(200).json(user);
  }
  @Validate(permissionBodyValidation)
  @Guard({ permissions: Permission.ALL })
  async changePermission(req: Request, res: Response) {
    if (Object.keys(req.body.permission).length === 0) throw new ServerError('no permission to change');
    const user = await AdminService.changePermission(req.body.employeeId, req.body.permission);
    res.status(200).json(user);
  }
}

export default new Admin();
