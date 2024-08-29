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

export type TArtist = {
  id: number; // Assuming there's an `id` primary key column
  name: string;
  dob?: Date | null;
  gender?: string | null;
  address?: string | null;
  first_release_year?: number | null;
  no_of_albums_released?: number | null;
  created_at: Date;
  updated_at: Date;
};
