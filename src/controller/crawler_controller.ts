import { Request, Response } from 'express';
import { getMusicals } from '../service/crawler_service';

const getMusicalsController = async (req: Request, res: Response) => {
  try {
    const musicals = await getMusicals();
    res.status(200).json(musicals);
  } catch (error) {
    console.error('Error in fetchMusicalsController:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export {
    getMusicalsController
}