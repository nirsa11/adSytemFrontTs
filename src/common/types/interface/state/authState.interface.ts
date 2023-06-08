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
}
