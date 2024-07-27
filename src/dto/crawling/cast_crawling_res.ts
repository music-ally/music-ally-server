export interface Casting_Res {
  musical_ID: number;
  cast: Castings[];
}

export interface Castings {
  role: string;
  cast_names: Castings_Info[];
}

export interface Castings_Info {
  actor_ID: number;
  name: string;
}