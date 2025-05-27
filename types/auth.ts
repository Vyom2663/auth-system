
export type UserData = {
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  email_verified_at : string | null;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordData = {
  email: string;
}

export type CompanyData = {
  company_name: string;
  email: string;
  contact_no: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  address: string;
  logo: FileList;
};