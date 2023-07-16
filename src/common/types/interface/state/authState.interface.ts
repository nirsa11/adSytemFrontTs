export class BaseState<T> {
  error: string;
  prevState: T | undefined;
}

export class CompanyState {
  name: string;
  nameForTaxInvoice: string;
  businessId: string;
  address: string;
}

export class RegisterPageState {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: number;
  confirmPassword: string;
  companyName: string;
  nameForTaxInvoice: string;
  businessId: string;
  address: string;
  error: string;
}

export class LoginPageState {
  email: string;
  password: string;
  rememberMe: boolean;
  error: string;
}

export class ResetPasswordState {
  emailReset: string;
  error: string;
}

export class ResetPasswordPageState {
  password: string;
  confirmPassword: string;
  error: string;
}