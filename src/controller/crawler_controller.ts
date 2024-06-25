import { Request, Response } from 'express';
import { get_musicals, get_theaters } from '../service/crawler_service';
import { get_artists } from '../service/crawler_service';

const get_musicals_controller = async (req: Request, res: Response) => {
  try {
    const musicals = await get_musicals();
    res.status(200).json(musicals);
  } catch (error) {
    console.error('Error in fetchMusicalsController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const get_artists_controller = async (req: Request, res: Response) => {
  try {
    const artists = await get_artists();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error in fetchArtistsController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const get_theaters_controller = async (req: Request, res: Response) => {
  try {
    const theaters = await get_theaters();
    res.status(200).json(theaters);
  } catch (error) {
    console.error('Error in fetchTheatersController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export {
  get_musicals_controller,
  get_artists_controller,
  get_theaters_controller
}