import { z } from 'zod';

export const patientBodyValidation = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2).optional(),
  age: z.number().optional(),
  address: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  phoneNumber: z.string().optional(),
  disease: z
    .object({
      name: z.string().optional(),
      info: z.string().optional(),
    })
    .optional(),
  doctor: z.string(),
});

export const editPatientBodyValidation = patientBodyValidation.deepPartial().omit({ doctor: true });

export type PatientBody = z.infer<typeof patientBodyValidation>;
export type EditPatientBody = z.infer<typeof editPatientBodyValidation>;
