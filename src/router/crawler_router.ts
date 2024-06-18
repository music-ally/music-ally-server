import { Router } from 'express';
import * as crawler_controller from '../controller/crawler_controller';

const crawler_router = Router();

const now_crawled_data = crawler_router.get('/crawling', crawler_controller.get_musicals_controller);

crawler_router.post('/crawling', crawler_controller.get_musicals_controller);

export default crawler_router;
