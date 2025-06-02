export type EmployeeData = {
  firstname: string;
  middlename?: string;
  lastname: string;
  email: string;
  password: string;
  gender?: 'male' | 'female' | 'other';
  marital_status?: 'married' | 'engaged' | 'unmarried';
  date_of_birth: string;
  date_of_joining: string;
  probation_end_date: string;
  blood_group: string;
  status: 'active' | 'inactive';
  pf_contribution: string;
  abry_contribution: string;
  esi_contribution: string;
};

export type AdminData = {
  firstname: string;
  lastname: string;
  email: string;
  date_of_joining: string;
  status: "active" | "inactive";
};