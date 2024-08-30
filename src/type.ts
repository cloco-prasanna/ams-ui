export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type TUser = {
  id: number;
  email: string;
  password_digest: string;
  first_name: string;
  last_name: string;
  gender?: Gender;
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

export type TPagination = {
  current_page: number;
  last_page: number;
  prev: number | null;
  next: number | null;
  per_page: number;
};

export type TUserResponse = Omit<TPagination, "per_page"> & {
  users: TUser[];
};
