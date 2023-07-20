import { z, ZodType } from 'zod';
import {
  AddCampaginState,
  EditCompanyPageState
} from '../types/interface/state/dashboard.interface';
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
        message: 'המחרוזת חייבת להכיל לפחות 6 תווים'
      }),
      confirmPassword: z.string().refine((value) => value === '' || value.length >= 6, {
        message: 'המחרוזת חייבת להכיל לפחות 6 תווים'
      }),

      companyName: z.string().nonempty('שדה זה הינו שדה חובה').min(3).max(20),
      businessNumber: z.string().nonempty('שדה זה הינו שדה חובה').min(5).max(20),
      nameForTaxInvoice: z.optional(z.string()),
      address: z.optional(z.string())
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'הסיסמה אינה תואמת',
      path: ['confirmPassword']
    })
);
export const editAnalystRegisterSchema: ZodType<Partial<EditCompanyPageState>> = applyTranslations(
  z
    .object({
      name: z.string().min(2).max(20),
      email: z.string().nonempty('שדה זה הינו שדה חובה').email(),
      mobileNumber: z
        .string()
        .nonempty('שדה זה הינו שדה חובה')
        .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר הנייד אינו תקין'),
      password: z.string().refine((value) => value === '' || value.length >= 6, {
        message: 'המחרוזת חייבת להכיל לפחות 6 תווים'
      }),
      confirmPassword: z.string().refine((value) => value === '' || value.length >= 6, {
        message: 'המחרוזת חייבת להכיל לפחות 6 תווים'
      })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'הסיסמה אינה תואמת',
      path: ['confirmPassword']
    })
);

export type ValidationEditCompanySchema = z.infer<typeof editCompanySchema>;

export const addCampaignSchema: ZodType<Partial<AddCampaginState>> = applyTranslations(
  z
    .object({
      name: z.string().nonempty('שדה זה הינו שדה חובה').min(2).max(20),
      dailyBudget: z.string().transform((val) => parseFloat(val)),

      budget: z.string().transform((val) => parseFloat(val)),
      status: z.string().nonempty(),
      target: z.string().nonempty()
    })
    .refine((data) => data.dailyBudget > 0, {
      message: 'המספר חייב להיות גדול מ 0',
      path: ['dailyBudget']
    })
    .refine((data) => data.budget > 0, {
      message: 'המספר חייב להיות גדול מ 0',
      path: ['budget']
    })
    .refine((data) => data.budget > data.dailyBudget, {
      message: 'התקציב חייב להיות גדול יותר מהתקציב היומי',
      path: ['budget']
    })
);

export type ValidationAddCampaginSchema = z.infer<typeof addCampaignSchema>;
