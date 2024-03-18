import express from 'express';

import { getWeatherForLatLong } from '../controllers/WeatherController';

//router
const router = express.Router();

router.get('/:latitude/:longitude', getWeatherForLatLong)

export default router;