export interface Theater_Res {
  theater_ID: number;
  name: string;
  location: string;
  theater_details: Theater_Details;
}

export interface Theater_Details {
  address?: string;
  road_address?: string;
  seats?: string[];
}
