import { z } from 'zod';

export const invoiceBodyValidation = z.object({
  paymentMethod: z.enum(['cash', 'visa']),
  discount: z.number().optional(),
  description: z.string().optional(),
  totalPrice: z.number(),
  patient: z.string().optional(),
});

export type InvoiceBody = z.infer<typeof invoiceBodyValidation>;
