export interface Theater {
  theater_ID: string;
  name: string;
  location: string;
  theater_details: Theater_Details;
}

export interface Theater_Details {
  address?: string;
  road_address?: string;
  seats?: string[];
}
