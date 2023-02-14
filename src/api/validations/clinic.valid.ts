import { z } from 'zod';

export const clinicBodyValidation = z.object({
  name: z.string().min(2).max(55),
});

export type ClinicBody = z.infer<typeof clinicBodyValidation>;
