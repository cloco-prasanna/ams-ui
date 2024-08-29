export type TUser = {
  id: number;
  email: string;
  password_digest: string;
  first_name: string;
  last_name: string;
  gender?: string;
  phone?: number;
  address?: string;
  created_at: Date;
  updated_at: Date;
  dob?: Date;
};
