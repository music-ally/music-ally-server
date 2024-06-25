export interface Artist {
  artist_ID: string;
  artist_details: Artist_Details[];
}

export interface Artist_Details {
  playdb_id: number;
  name: string;
  profile_image?: string;
  job?: string;
  agency?: string;
  debut?: string;
  birthday?: string;
  physical?: string;
}
