export interface Musical {
  musical_ID: string;
  musical_details: Musical_Details;
}

export interface Casts {
  role: string;
  cast_names: string[];
}

export interface Musical_Details {
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
