export interface EditCompanyPageState {
  name: string;
  email: string;
  password?: string;
  mobileNumber: string;
  role: number;
  confirmPassword?: string;
  companyName: string;
  nameForTaxInvoice: string;
  businessId: string;
  address: string;
  error: string;
}
