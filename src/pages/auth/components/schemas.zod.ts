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
import translation from 'zod-i18n-map/locales/he/zod.json';

// Apply translation messages to each validation rule
const applyTranslations = (rule: z.ZodTypeAny) => {
  return rule.transform((val) => {
    if (val instanceof z.ZodObject) {
      return new z.ZodObject({
        ...val.shape(),
        ...Object.entries(val.shape()).reduce((acc, [key, value]) => {
          return {
            ...acc,

            [key]: applyTranslations(value as z.ZodTypeAny).message(zodI18nMap[key])
          };
        }, {})
      });
    }
    return val;
  });
};

export const registerSchema: ZodType<Partial<RegisterPageState>> = applyTranslations(
  z
    .object({
      name: z.string().min(2).max(20),
      email: z.string().nonempty('שדה זה הינו שדה חובה').email(),
      mobileNumber: z
        .string()
        .nonempty('שדה זה הינו שדה חובה')
        .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר הנייד אינו תקין'),
      password: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(20),
      confirmPassword: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(20),
      companyName: z.string().nonempty('שדה זה הינו שדה חובה').min(3).max(20),
      nameForTaxInvoice: z.string().nonempty('שדה זה הינו שדה חובה').min(3).max(20),
      businessId: z.string().nonempty('שדה זה הינו שדה חובה').min(5).max(20),
      address: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(50)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'הסימה אינה תואמת',
      path: ['confirmPassword']
    })
);

export const loginSchema: ZodType<Partial<LoginPageState>> = applyTranslations(
  z.object({
    email: z.string().nonempty('שדה זה הינו שדה חובה').email(),
    password: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(20)
  })
);

export const resetPasswordSchema: ZodType<Partial<ResetPasswordPageState>> = z
  .object({
    confirmPassword: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(20),
    password: z.string().nonempty('שדה זה הינו שדה חובה').min(6).max(20)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const resetEmailSchema: ZodType<Partial<ResetPasswordState>> = z.object({
  emailReset: z.string().email().nonempty('שדה זה הינו שדה חובה')
});

i18next.init({
  lng: 'he',
  resources: {
    he: { zod: translation }
  }
});

// Set the global translation messages for Zod
z.setErrorMap(zodI18nMap);

export type ValidationRegisterSchema = z.infer<typeof registerSchema>;

export type ValidationLoginSchema = z.infer<typeof loginSchema>;

export type ValidationResetSchema = z.infer<typeof resetEmailSchema>;

export type ValidationResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
