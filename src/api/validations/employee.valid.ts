import { z } from 'zod';

export const employeeBodyValidation = z.object({
  firstName: z.string().min(2).max(55).trim(),
  middleName: z.string().min(2).max(55).trim(),
  lastName: z.string().min(2).max(55).trim(),
  about: z.string().min(2),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(['male', 'female']),
  address: z.object({
    city: z.string(),
    zip: z.number(),
    address1: z.string(),
    address2: z.string().optional(),
  }),
  employeeType: z.enum(['full-time', 'part-time']).default('full-time'),
  hrsPerDay: z.number().max(12).min(1),
  phoneNumber: z.string(),
  salary: z.number(),
  jopTitle: z.string(),
  role: z.enum(['doctor', 'admin', 'Manager', 'employee']).default('employee'),
});
