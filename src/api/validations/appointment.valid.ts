import { z } from 'zod';

export const appointmentBodyValidation = z.object({
  date: z.coerce.date(),
  clinic: z.string(),
  patient: z.string(),
  doctor: z.string(),
});

export type AppointmentBody = z.infer<typeof appointmentBodyValidation>;
