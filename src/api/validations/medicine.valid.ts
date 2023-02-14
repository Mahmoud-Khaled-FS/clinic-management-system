import { z } from 'zod';

export const medicineBodyValidation = z.object({
  title: z.string().trim(),
  description: z.string().optional(),
  price: z.number().optional(),
});

export type MedicineBody = z.infer<typeof medicineBodyValidation>;

export const editMedicineBodyValidation = medicineBodyValidation.partial();

export type EditMedicineBody = z.infer<typeof editMedicineBodyValidation>;
