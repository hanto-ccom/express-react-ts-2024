import cors from 'cors';
import express, {
    Request,
    Response,
} from 'express';

import { errorHandler } from './middleware/errorHandler';
import weatherRouter from './routes/WeatherRoutes';

// Create an instance of express to serve our end points
const app = express();
app.use(cors({ origin: "http://localhost:5173" }))

// Define the port we're going to listen for
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route that sends back a hello message
app.use('/weather', weatherRouter)

app.get('*', (req: Request, res: Response) => {
    res.status(404).send('404 Not Found');
});

app.use(errorHandler)

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});