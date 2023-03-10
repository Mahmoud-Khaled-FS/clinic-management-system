import { z } from 'zod';

export const employeeBodyValidation = z.object({
  email: z
    .string()
    .email()
    .transform((e) => e.toLowerCase()),
  firstName: z.string().min(2).max(55).trim(),
  middleName: z.string().min(2).max(55).trim().optional(),
  lastName: z.string().min(2).max(55).trim(),
  about: z.string().min(2).optional(),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(['male', 'female']),
  address: z
    .object({
      city: z.string(),
      zip: z.number(),
      address1: z.string(),
      address2: z.string().optional(),
    })
    .optional(),
  employeeType: z.enum(['full-time', 'part-time']).default('full-time'),
  hrsPerDay: z.number().max(12).min(1).optional(),
  phoneNumber: z.string().optional(),
  salary: z.number().optional(),
  jopTitle: z.string().optional(),
  role: z.enum(['doctor', 'admin', 'Manager', 'employee']).default('employee'),
});

export type EmployeeBody = z.infer<typeof employeeBodyValidation>;

export const editEmployeeSelfBodyValidation = employeeBodyValidation
  .omit({
    email: true,
    jopTitle: true,
    role: true,
    salary: true,
  })
  .partial();
type EmployeeEditSelfBody = z.infer<typeof editEmployeeSelfBodyValidation>;

export const editEmployeeAdminBodyValidation = employeeBodyValidation.omit({ role: true }).partial();
type EmployeeEditAdminBody = z.infer<typeof editEmployeeAdminBodyValidation>;

export type EditEmployeeBody = EmployeeEditAdminBody | EmployeeEditSelfBody;

const dayWorkValid = z
  .object({
    startFrom: z.number().min(0).max(24),
    endAt: z.number().min(0).max(24),
  })
  .or(z.null())
  .default(null);

export const doctorProfileBodyValidation = z.object({
  specialty: z.string().min(1),
  timesOfWork: z
    .object({
      sunday: dayWorkValid,
      monday: dayWorkValid,
      tuesday: dayWorkValid,
      wednesday: dayWorkValid,
      thursday: dayWorkValid,
      friday: dayWorkValid,
      saturday: dayWorkValid,
    })
    .optional(),
});

export const editDoctorProfileBodyValidation = doctorProfileBodyValidation.partial();
export type doctorProfileBody = z.infer<typeof doctorProfileBodyValidation>;
export type editDoctorProfileBody = z.infer<typeof editDoctorProfileBodyValidation>;
