export enum Permission {
  NONE = 0,
  READ = 1,
  WRITE = 2,
  ALL = 3,
}

export type UserRole = 'doctor' | 'admin' | 'manager' | 'employee';

export interface RolePermission {
  apppointment: Permission;
  doctors: Permission;
  patient: Permission;
  medicine: Permission;
  clinic: Permission;
  employee: Permission;
  prescription: Permission;
  reports: Permission;
  invoice: Permission;
  permissions: Permission;
}
export type SelectedRolePermission = Partial<RolePermission>;

export const managerDefaultPermission: RolePermission = {
  apppointment: Permission.ALL,
  doctors: Permission.ALL,
  patient: Permission.ALL,
  medicine: Permission.ALL,
  clinic: Permission.ALL,
  prescription: Permission.ALL,
  employee: Permission.ALL,
  permissions: Permission.ALL,
  reports: Permission.ALL,
  invoice: Permission.ALL,
};
export const adminDefaultPermission: RolePermission = {
  apppointment: Permission.ALL,
  doctors: Permission.ALL,
  patient: Permission.WRITE,
  medicine: Permission.ALL,
  clinic: Permission.ALL,
  prescription: Permission.ALL,
  employee: Permission.ALL,
  permissions: Permission.WRITE,
  reports: Permission.ALL,
  invoice: Permission.ALL,
};

export const doctorDefaultPermission: RolePermission = {
  apppointment: Permission.ALL,
  doctors: Permission.READ,
  patient: Permission.READ,
  medicine: Permission.READ,
  clinic: Permission.READ,
  prescription: Permission.NONE,
  employee: Permission.NONE,
  permissions: Permission.NONE,
  reports: Permission.NONE,
  invoice: Permission.NONE,
};
export const employeeDefaultPermission: RolePermission = {
  apppointment: Permission.NONE,
  doctors: Permission.READ,
  patient: Permission.READ,
  medicine: Permission.READ,
  clinic: Permission.READ,
  prescription: Permission.NONE,
  employee: Permission.NONE,
  permissions: Permission.NONE,
  reports: Permission.NONE,
  invoice: Permission.NONE,
};
