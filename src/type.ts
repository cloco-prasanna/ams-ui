export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Genre {
  RnB = "rnb",
  Country = "country",
  Classic = "classic",
  Rock = "rock",
  Jazz = "jazz",
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
  id: number;
  name: string;
  dob?: Date | null;
  gender?: Gender;
  address?: string | null;
  first_release_year?: number | null;
  no_of_albums_released?: number | null;
  created_at: Date;
  updated_at: Date;
};

export type TMusic = {
  id: number;
  title: string;
  artist_id: number;
  album_name?: string | null;
  genre?: string;
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

export type TArtistResponse = Omit<TPagination, "per_page"> & {
  artists: TArtist[];
};

export type TMusicResponse = Omit<TPagination, "per_page"> & {
  musics: TMusic[];
};
