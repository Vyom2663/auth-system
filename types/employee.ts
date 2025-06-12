export type EmployeeData = {
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "other";
  marital_status?: "married" | "engaged" | "unmarried";
  date_of_birth: string;
  date_of_joining: string;
  probation_end_date: string;
  blood_group: string;
  status: "active" | "inactive";
  pf_contribution: string;
  abry_contribution: string;
  esi_contribution: string;
};

export type AdminData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  date_of_joining: string;
  status: "active" | "inactive";
};

export type UpdateEmployeeData = {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "other";
  marital_status?: "married" | "engaged" | "unmarried";
  date_of_birth: string;
  date_of_joining: string;
  probation_end_date: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  status: "active" | "inactive";
  pf_contribution: number;
  abry_contribution: number;
  esi_contribution: number;

  residential: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  bank_name: string;
  account_holder_name: string;
  account_no: string;
  branch_name: string;
  ifsc_code: string;
  account_type: string;

  degree: string;
  college_name: string;
  start_month_year: string;
  end_month_year: string;

  personal: string;
  home: string;

  aadhar_card: string;
  pan_card: string;

  designation: string;
  pf_account_no: string;
  uan_no: string;
  esi_no: string;
};

export type DisplayData = {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "other";
  marital_status?: "married" | "engaged" | "unmarried";
  date_of_birth: string;
  date_of_joining: string;
  probation_end_date: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  status: "active" | "inactive";
  pf_contribution: number;
  abry_contribution: number;
  esi_contribution: number;

  address: Address;

  bank_info: BankInfo;

  education_info: EducationInfo;

  contact_no: Contact;

  aadhar_card: string;
  pan_card: string;

  designation: string;
  pf_account_no: string;
  uan_no: string;
  esi_no: string;
};

type Address = {
  residential: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
};

type BankInfo = {
  bank_name: string;
  account_holder_name: string;
  account_no: string;
  branch_name: string;
  ifsc_code: string;
  account_type: string;
};

type EducationInfo = {
  degree: string;
  college_name: string;
  start_month_year: string;
  end_month_year: string;
};

type Contact = {
  personal: number;
  home: number;
};
