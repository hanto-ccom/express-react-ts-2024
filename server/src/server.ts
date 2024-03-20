import cors from 'cors';
import express, {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express';

import weatherRouter from './routes/WeatherRoutes';

//error handler
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
};

// Create an instance of express to serve our end points
const app = express();
app.use(cors({ origin: "http://localhost:5173" }))

// Define the port we're going to listen for
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route that sends back a hello message
app.use('/weather', weatherRouter)

app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
    res.status(404).send('404 Not Found');
});

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});