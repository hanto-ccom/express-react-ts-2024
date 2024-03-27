import cors from 'cors';
import express, {
    Request,
    Response,
} from 'express';
import mongoose from 'mongoose';

import auth from './middleware/authenticationHandler';
import { errorHandler } from './middleware/errorHandler';
import authenticationRouter from './routes/AuthenticationRoutes';
import userRouter from './routes/UserRoutes';
import weatherRouter from './routes/WeatherRoutes';

// Create an instance of express to serve our end points
const app = express();
app.use(cors({ origin: "http://localhost:5173" }))

// Define the port we're going to listen for
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

//login
app.use('/authentication', authenticationRouter)

// Weather route
app.use('/weather', weatherRouter)

//protected route
app.get('/test', auth, (req, res) => {
    res.status(200).json('Protected route')
})

app.use('/user', auth, userRouter)

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

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});