import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
    Request,
    Response,
} from 'express';
import https from 'https';
import mongoose from 'mongoose';

import config from './config/config';
import cookieAuth from './middleware/authenticationHandler';
import { errorHandler } from './middleware/errorHandler';
import authenticationRouter from './routes/AuthenticationRoutes';
import userRouter from './routes/UserRoutes';
import weatherRouter from './routes/WeatherRoutes';

// Create an instance of express to serve our end points
const app = express();
app.use(cookieParser())
app.use(cors({ origin: "https://localhost:5173", credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }))

// Define the port we're going to listen for
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

//login
app.use('/authentication', authenticationRouter)
// Weather route
app.use('/weather', weatherRouter)
//protected route
app.get('/test', cookieAuth, (req, res) => {
    res.status(200).json('Protected route')
})
app.use('/user', cookieAuth, userRouter)
//--- end protected routes-------
app.get('*', (req: Request, res: Response) => {
    res.status(404).send('404 Not Found');
});
//use the errorHandler middleware function
app.use(errorHandler)

//connect to Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/weather-app')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log('Could not connect to MongoDB...', err))

// Create an HTTPS server
https.createServer({
    key: config.ssl.key,
    cert: config.ssl.cert
}, app)
    .listen(PORT, () => {
        console.log(`Server listening on https://localhost:${PORT}`);
    });