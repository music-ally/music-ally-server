export interface Actor_Res {
  actor_ID: number;
  actor_details: Actor_Details;
}

export interface Actor_Details {
  name: string;
  profile_image?: string;
  job?: string;
  agency?: string;
  debut?: string;
  birthday?: string;
  physical?: string;
}
