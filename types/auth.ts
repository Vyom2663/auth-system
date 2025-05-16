
export type UserData = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
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