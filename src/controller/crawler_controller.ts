import { Request, Response } from "express";
import * as crawler_service from "../service/crawler_service";
import * as playdb_crawler_util from "../crawler/playdb_crawler_util";
import axios from "axios";
import { Casts, Musical_Res } from "../dto/crawling/musical_crawling_res";
import { Actor_Res } from "../dto/crawling/actor_crawling_res";
import { Theater_Res } from "../dto/crawling/theater_crawling_res";

const get_musicals_controller = async (req: Request, res: Response) => {
  try {
    const musicals = await crawler_service.get_musicals();
    res.status(200).json(musicals);
  } catch (error) {
    console.error("Error in fetchMusicalsController:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const get_actors_controller = async (req: Request, res: Response) => {
  try {
    const artists = await crawler_service.get_actors();
    res.status(200).json(artists);
  } catch (error) {
    console.error("Error in fetchArtistsController:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const get_theaters_controller = async (req: Request, res: Response) => {
  try {
    const theaters = await crawler_service.get_theaters();
    res.status(200).json(theaters);
  } catch (error) {
    console.error("Error in fetchTheatersController:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const save_musicals_controller = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3000/crawling/musical");
    const musicals: Musical_Res[] = response.data;

    await crawler_service.save_musicals(musicals);
    res.status(201).json({ message: "Musicals saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving musicals", error });
  }
};

const save_actors_controller = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3000/crawling/actor");
    const actors: Actor_Res[] = response.data;

    await crawler_service.save_actors(actors);
    res.status(201).json({ message: "Actors saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving actors", error });
  }
};

const save_theaters_controller = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3000/crawling/theater");
    const theaters: Theater_Res[] = response.data;

    await crawler_service.save_theaters(theaters);
    res.status(201).json({ message: "Theaters saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving theaters", error });
  }
};

export {
  get_musicals_controller,
  get_actors_controller,
  get_theaters_controller,
  save_musicals_controller,
  save_actors_controller,
  save_theaters_controller,
};
