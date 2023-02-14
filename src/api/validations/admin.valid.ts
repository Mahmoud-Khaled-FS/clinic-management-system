import { z } from 'zod';

export const adminBodyValidation = z.object({
  employeeId: z.string(),
});

const permissionBody = z.object({
  appointment: z.enum(['write', 'none', 'read', 'all']).optional(),
  doctors: z.enum(['write', 'none', 'read', 'all']).optional(),
  patient: z.enum(['write', 'none', 'read', 'all']).optional(),
  medicine: z.enum(['write', 'none', 'read', 'all']).optional(),
  clinic: z.enum(['write', 'none', 'read', 'all']).optional(),
  prescription: z.enum(['write', 'none', 'read', 'all']).optional(),
  employee: z.enum(['write', 'none', 'read', 'all']).optional(),
  permissions: z.enum(['write', 'none', 'read', 'all']).optional(),
  reports: z.enum(['write', 'none', 'read', 'all']).optional(),
  invoice: z.enum(['write', 'none', 'read', 'all']).optional(),
});
export const permissionBodyValidation = z.object({
  employeeId: z.string(),
  permission: permissionBody,
});

export type PermissionBody = z.infer<typeof permissionBody>;
