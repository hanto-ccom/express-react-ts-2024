import express from 'express';

import { getWeatherForCity } from '../controllers/WeatherController';

//router
const router = express.Router();

router.get('/:city', getWeatherForCity)

export default router;