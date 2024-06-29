import mongoose from "mongoose";

export interface create_actor_dto {
  actor_playdb_id: number;
  actor_name: string;
  profile_image?: string;
  birthday?: Date;
  agency?: string;
  physical?: string;
  job?: string;
}
