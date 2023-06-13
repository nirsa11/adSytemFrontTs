import {
  LoginPageState,
  RegisterPageState,
  ResetPasswordPageState,
  ResetPasswordState
} from '../../../common/types/interface/state/authState.interface';
import { InputProps } from '../../../common/types/interface/ui/inputProps.interface';
import { z, ZodType } from 'zod';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
// Import your language translation files
import translation from 'zod-i18n-map/locales/he/zod.json';

// lng and resources key depend on your locale.
i18next.init({
  lng: 'he',
  resources: {
    es: { zod: translation }
  }
});
z.setErrorMap(zodI18nMap);

export const registerSchema: ZodType<Partial<RegisterPageState>> = z
  .object({
    name: z.string().nonempty({ message: 'הערך אינו תקין' }).min(2).max(20),
    email: z.string().email().nonempty(),
    mobileNumber: z
      .string()
      .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר הנייד אינו תקין')
      .nonempty(),
    password: z.string().nonempty().min(6).max(20),
    confirmPassword: z.string().nonempty().min(6).max(20),
    companyName: z.string().nonempty().min(3).max(20),
    nameForTaxInvoice: z.string().nonempty().min(3).max(20),
    businessId: z.string().nonempty().min(5).max(20),
    address: z.string().nonempty().min(6).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const loginSchema: ZodType<Partial<LoginPageState>> = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(5).max(20).nonempty()
});

export const resetPasswordSchema: ZodType<Partial<ResetPasswordPageState>> = z
  .object({
    confirmPassword: z.string().nonempty().min(5).max(20),
    password: z.string().min(5).max(20).nonempty()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const resetEmailSchema: ZodType<Partial<ResetPasswordState>> = z.object({
  emailReset: z.string().email().nonempty()
});

export type ValidationRegisterSchema = z.infer<typeof registerSchema>;

export type ValidationLoginSchema = z.infer<typeof loginSchema>;

export type ValidationResetSchema = z.infer<typeof resetEmailSchema>;

export type ValidationResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
