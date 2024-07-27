export interface Musical_Res {
  musical_ID: number;
  musical_details: Musical_Details;
}

export interface Musical_Details {
  image_url: string;
  title: string;
  sub_title: string;
  genre: string;
  date: string;
  place: string;
  age_limit: string;
  runtime: string;
  website: string;
  cast: Casts[];
}

export interface Casts {
  role: string;
  cast_names: string[];
}
