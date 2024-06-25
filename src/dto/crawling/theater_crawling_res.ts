export interface Theater {
  theater_ID: string;
  location: string;
  theater_details: Theater_Details;
}

export interface Theater_Details {
  name: string;
  address?: string;
  road_address?: string;
  seats?: string[];
}
