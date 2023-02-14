import { z } from 'zod';

export const prescriptionBodyValidation = z.object({
  doctor: z.string().optional(),
  patient: z.string(),
  medicines: z.array(z.string()).optional(),
});

export type PrescriptionBody = z.infer<typeof prescriptionBodyValidation>;
