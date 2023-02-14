import { getDefaultPermission } from '../helpers/get_default_permission';
import { Permission } from '../interfaces/permissions';
import EmployeeModel from '../models/employee.model';
import ServerError from '../util/errors';
import { PermissionBody } from '../validations/admin.valid';
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
  static async addAdmin(id: string) {
    const user = await EmployeeModel.findById(id);
    if (!user) {
      throw new ServerError('user Not found', 400);
    }
    if (user.role === 'admin') {
      throw new ServerError('user is admin', 400);
    }
    user.role = 'admin';
    user.permissions = getDefaultPermission('admin');
    return user.save();
  }
  static async removeAdmin(id: string) {
    const user = await EmployeeModel.findById(id);
    if (!user) {
      throw new ServerError('user Not found', 400);
    }
    if (user.role !== 'admin') {
      throw new ServerError('user is not admin', 400);
    }
    user.role = user.isDoctor ? 'doctor' : 'employee';
    user.permissions = getDefaultPermission(user.isDoctor ? 'doctor' : 'employee');
    return user.save();
  }
  static async changePermission(id: string, per: PermissionBody) {
    const user = await EmployeeModel.findById(id);
    if (!user) {
      throw new ServerError('user Not found', 400);
    }
    type Keys = keyof typeof per;
    const keys = Object.keys(per) as Keys[];
    for (const p of keys) {
      let permissionValue: Permission;
      if (per[p] === 'all') {
        permissionValue = Permission.ALL;
      } else if (per[p] === 'none') {
        permissionValue = Permission.NONE;
      } else if (per[p] === 'read') {
        permissionValue = Permission.READ;
      } else if (per[p] === 'write') {
        permissionValue = Permission.WRITE;
      } else {
        permissionValue = Permission.NONE;
      }
      user.permissions[p] = permissionValue;
    }
    return await user.save();
  }
}
