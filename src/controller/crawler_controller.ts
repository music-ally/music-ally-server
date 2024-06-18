import { Request, Response } from 'express';
import { get_musicals } from '../service/crawler_service';

const get_musicals_controller = async (req: Request, res: Response) => {
  try {
    const musicals = await get_musicals();
    res.status(200).json(musicals);
  } catch (error) {
    console.error('Error in fetchMusicalsController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export {
  get_musicals_controller
}