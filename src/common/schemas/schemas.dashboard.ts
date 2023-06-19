import { z, ZodType } from 'zod';
import { EditCompanyPageState } from '../types/interface/state/dashboard.interface';
import { applyTranslations } from '.';

export const editCompanySchema: ZodType<Partial<EditCompanyPageState>> = applyTranslations(
  z
    .object({
      name: z.string().min(2).max(20),
      email: z.string().nonempty('שדה זה הינו שדה חובה').email(),
      mobileNumber: z
        .string()
        .nonempty('שדה זה הינו שדה חובה')
        .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר הנייד אינו תקין'),
      password: z.string().refine((value) => value === '' || value.length >= 6, {
        message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
      }),
      confirmPassword: z.string().refine((value) => value === '' || value.length >= 6, {
        message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
      }),
      companyName: z.string().nonempty('שדה זה הינו שדה חובה').min(3).max(20),
      nameForTaxInvoice: z.string().nonempty('שדה זה הינו שדה חובה').min(3).max(20),
      businessId: z.string().nonempty('שדה זה הינו שדה חובה').min(5).max(20),
      address: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(50)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'הסיסמה אינה תואמת',
      path: ['confirmPassword']
    })
);

export type ValidationEditCompanySchema = z.infer<typeof editCompanySchema>;
