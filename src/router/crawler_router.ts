import { Router } from 'express';
import * as crawler_controller from '../controller/crawler_controller';

const crawler_router = Router();
// get_artists_controller = 
crawler_router.get('/crawling', crawler_controller.get_musicals_controller);
crawler_router.get('/crawling/artist', crawler_controller.get_artists_controller);
crawler_router.get('/crawling/theater', crawler_controller.get_theaters_controller);
// crawler_router.post('/crawling', crawler_controller.get_musicals_controller);

export default crawler_router;
