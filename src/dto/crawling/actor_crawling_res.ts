export interface Actor {
  actor_ID: string;
  actor_details: Actor_Details[];
}

export interface Actor_Details {
  playdb_id: number;
  name: string;
  profile_image?: string;
  job?: string;
  agency?: string;
  debut?: string;
  birthday?: string;
  physical?: string;
}
