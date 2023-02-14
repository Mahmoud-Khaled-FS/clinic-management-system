import {
  adminDefaultPermission,
  managerDefaultPermission,
  doctorDefaultPermission,
  employeeDefaultPermission,
  UserRole,
} from '../interfaces/permissions';

export function getDefaultPermission(role: UserRole) {
  if (role === 'admin') {
    return adminDefaultPermission;
  }
  if (role === 'manager') {
    return managerDefaultPermission;
  }
  if (role === 'doctor') {
    return doctorDefaultPermission;
  }
  if (role === 'employee') {
    return employeeDefaultPermission;
  }
  return employeeDefaultPermission;
}
