import { getDefaultPermission } from '../helpers/get_default_permission';
import { UserRole } from '../interfaces/permissions';
import EmployeeModel from '../models/employee.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { EditEmployeeBody, EmployeeBody } from '../validations/employee.valid';
import * as bcrypt from 'bcryptjs';

export default class EmployeeService {
  static async create(data: EmployeeBody, role?: UserRole) {
    const employeeExist = await EmployeeModel.findOne({
      $or: [{ email: data.email }, { firstName: data.firstName, middleName: data.middleName, lastName: data.lastName }],
    });
    if (employeeExist) {
      throw new ServerError('Employee exist with the same email or same name', 400);
    }
    const hashedPassword = await bcrypt.hash('123456', 16);
    const permissions = getDefaultPermission(role || 'employee');
    const emplyee = new EmployeeModel({
      ...data,
      password: hashedPassword,
      role: role,
      permissions: permissions,
      isDoctor: role === 'doctor',
    });
    return emplyee.save();
  }
  static async edit(id: string, data: EditEmployeeBody, self?: boolean) {
    const employee = await EmployeeModel.findByIdAndUpdate(id, data);
    if (!employee) {
      throw new ServerError('Employee not founded', 400);
    }
    if (employee.role === 'manager' && !self) throw new ServerError('only manager can edit him self', 401);
    await employee.save();
    return data;
  }
  static async delete(id: string) {
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      throw new ServerError('Employee not founded', 400);
    }
    if (employee.role === 'manager') throw new ServerError('can not delete the manager', 401);
    await employee.remove();
    // await employee.save();
    return;
  }
  static async get(id: string) {
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      throw new ServerError('Employee not founded', 404);
    }
    return employee;
  }
  static async getAll(page: number = 1, options: any) {
    const optionsMaker = new FilterQuery();
    const pagination = optionsMaker.pagination(page);
    optionsMaker.sort('firstName', options.sort);
    optionsMaker.startWith('firstName', options.name);
    optionsMaker.startWith('email', options.email);
    const employees = await EmployeeModel.find(
      optionsMaker.filter,
      { firstName: 1, lastName: 1, _id: 1 },
      optionsMaker.options,
    )
      .skip(pagination.skip)
      .limit(pagination.limit);
    return employees;
  }
}
