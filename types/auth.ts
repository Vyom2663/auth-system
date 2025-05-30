export type UserData = {
  user: {
    email: string | null;
    firstname: string | null;
    lastname: string | null;
    email_verified_at: string | null;
  };
  company: Company[]; 
};

type Company = {
  name: string;
  logo_url: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  password: string;
  password_confirmation:string;
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
  logo: FileList | null;
};
