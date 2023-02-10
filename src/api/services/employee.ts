import { UserRole, employeeDefaultPremission, managerDefaultPremission } from '../interfaces/permissions';
import EmployeeModel from '../models/employee.model';
import { EmployeeBody } from '../validations/employee.valid';
import * as bcrypt from 'bcryptjs';

export default class EmployeeService {
  static async create(data: EmployeeBody, role?: UserRole) {
    const email = `${data.firstName.toLowerCase()}_${data.lastName.toLowerCase()}${Math.floor(
      Math.random() * 1000,
    )}@c.com`;
    const hashedPassword = await bcrypt.hash('123456', 16);
    let employeeRole = employeeDefaultPremission;
    if (role === 'manager') {
      employeeRole = managerDefaultPremission;
    }
    const emplyee = new EmployeeModel({
      ...data,
      email: email,
      password: hashedPassword,
      role: role,
      premissions: employeeRole,
      isDoctor: role === 'doctor',
    });
    return emplyee.save();
  }
}
