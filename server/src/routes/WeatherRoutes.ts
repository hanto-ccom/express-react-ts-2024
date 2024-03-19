import express from 'express';

import {
    getWeatherForCity,
    getWeatherForLatLong,
} from '../controllers/WeatherController';

//router
const router = express.Router();

router.get('/:latitude/:longitude', getWeatherForLatLong)
router.get('/:city', getWeatherForCity)

export default router;