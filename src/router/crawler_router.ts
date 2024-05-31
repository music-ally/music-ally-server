import { Router } from 'express';
import * as crawler_controller from '../controller/crawler_controller';

const crawler_router = Router();

crawler_router.get('/crawling', crawler_controller.get_musicals_controller);

export default crawler_router;
