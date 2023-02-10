import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Validate } from '../decorators/validate_body';
import { editEmployeeAdminBodyValidation, employeeBodyValidation } from '../validations/employee.valid';
import EmployeeService from '../services/employee';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import ServerError from '../util/errors';

@Controller()
class Admin {
  @Guard({ employee: Permission.WRITE })
  @Validate(employeeBodyValidation)
  public async create(req: Request, res: Response) {
    const employee = await EmployeeService.create(req.body);
    return res.status(201).json(employee);
  }

  @Guard({ employee: Permission.ALL })
  @Validate(editEmployeeAdminBodyValidation)
  public async editById(req: Request, res: Response) {
    if (Object.keys(req.body).length === 0) throw new ServerError('no data to update', 400);
    const employee = await EmployeeService.edit(req.params.id, req.body);
    return res.status(201).json(employee);
  }

  @Validate(editEmployeeAdminBodyValidation)
  public async edit(req: Request, res: Response) {
    const employee = await EmployeeService.edit(req.userId!, req.body, true);
    return res.status(201).json(employee);
  }

  @Guard({ employee: Permission.ALL })
  public async deleteById(req: Request, res: Response) {
    await EmployeeService.delete(req.params.id);
    return res.sendStatus(204);
  }
  @Guard({ employee: Permission.READ })
  public async getById(req: Request, res: Response) {
    const employee = await EmployeeService.get(req.params.id);
    return res.status(200).json(employee);
  }
  @Guard({ employee: Permission.READ })
  public async getAll(req: Request, res: Response) {
    let { page, sort, name, email } = req.query;
    page = page ? page : '1';
    const options = { sort: sort, name, email };
    const employee = await EmployeeService.getAll(+page, options);
    return res.status(200).json(employee);
  }
}

export default new Admin();
