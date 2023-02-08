export type Premission = 'w' | 'r' | 'a' | 'none';

export type UserRole = 'doctor' | 'admin' | 'Manager' | 'employee';

export interface RolePremission {
  apppointment: Premission;
  doctors: Premission;
  patient: Premission;
  medicine: Premission;
  clinic: Premission;
  employee: Premission;
  prescription: Premission;
  reports: Premission;
  invoice: Premission;
  permissions: Premission;
}

export const adminDefaultPremission: RolePremission = {
  apppointment: 'a',
  doctors: 'a',
  patient: 'w',
  medicine: 'a',
  clinic: 'a',
  prescription: 'a',
  employee: 'a',
  permissions: 'w',
  reports: 'a',
  invoice: 'a',
};

export const doctorDefaultPremission: RolePremission = {
  apppointment: 'a',
  doctors: 'r',
  patient: 'r',
  medicine: 'r',
  clinic: 'r',
  prescription: 'none',
  employee: 'none',
  permissions: 'none',
  reports: 'none',
  invoice: 'none',
};
export const employeeDefaultPremission: RolePremission = {
  apppointment: 'none',
  doctors: 'r',
  patient: 'r',
  medicine: 'r',
  clinic: 'r',
  prescription: 'none',
  employee: 'none',
  permissions: 'none',
  reports: 'none',
  invoice: 'none',
};
// export const patientDefaultPremission: RolePremission = {
//   apppointment: 'none',
//   doctors: 'none',
//   patient: 'r',
//   medicine: 'r',
//   clinic: 'r',
//   prescription: 'none',
//   employee: 'none',
//   permissions: 'none',
//   reports: 'none',
//   invoice: 'none',
// };
