import { RegisterPageState } from "../../../common/types/interface/state/authState.interface";
import { InputProps } from "../../../common/types/interface/ui/inputProps.interface";
import { z, ZodType } from "zod";

export const registerInputs: Partial<InputProps>[] = [
  {
    name: "companyName",
    label: "שם חברה",
    type: "text",
    placeholder: "",
  },
  {
    name: "nameForTax",
    label: "שם לצורך חשבונית מס",
    type: "text",
    placeholder: "הכנס מייל",
  },
  {
    name: "buissnessId",
    label: "ח.פ תעודת זהות",
    type: "text",
    placeholder: "הכנס סיסמא",
  },

  {
    name: "address",
    label: "כתובת",
    type: "text",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "contactName",
    label: "איש קשר",
    type: "text",
    placeholder: "הכנס מייל",
  },
  {
    name: "phone",
    label: "טלפון",
    type: "tel",
    placeholder: "הכנס מייל",
  },
  {
    name: "email",
    label: 'דוא"ל',
    type: "email",
    placeholder: "הכנס סיסמא",
  },
  {
    name: "password",
    label: "סיסמה",
    type: "email",
    placeholder: "הכנס סיסמא",
  },
];

export const registerSchema: ZodType<Partial<RegisterPageState>> = z
  .object({
    name: z
      .string()
      .min(2)
      .max(30)
      .nonempty(),
    email: z
      .string()
      .email()
      .nonempty(),
    mobileNumber: z
      .string()
      .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number")
      .nonempty(),
    password: z
      .string()
      .min(5)
      .max(20)
      .nonempty(),
    confirmPassword: z
      .string()
      .min(5)
      .max(20)
      .nonempty(),
    companyName: z
      .string()
      .min(5)
      .max(20)
      .nonempty(),
    nameForTaxInvoice: z
      .string()
      .min(5)
      .max(20)
      .nonempty(),
    businessId: z
      .string()
      .min(5)
      .max(20)
      .nonempty(),
    address: z.string().regex(/^\d+$/),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ValidationRegisterSchema = z.infer<typeof registerSchema>;
