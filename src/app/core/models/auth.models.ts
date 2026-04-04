export interface Login {
  email: string;
  password: string;
}

export interface Token {
  token: string | null;
}

export interface Register {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
  password: string;
  city: string;
}
