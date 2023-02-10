import EmployeeModel from '../models/employee.model';
import ServerError from '../util/errors';
import { EmployeeBody } from '../validations/employee.valid';
import EmployeeService from './employee';

export default class AdminService {
  static async createManager(data: EmployeeBody) {
    const managerExist = await EmployeeModel.findOne({ role: 'manager' }).select({ _id: 1 });
    if (managerExist) {
      throw new ServerError('Manager aleady exists', 401);
    }
    const manager = await EmployeeService.create(data, 'manager');
    return manager;
  }
}
