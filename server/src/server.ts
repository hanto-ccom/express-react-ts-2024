import dotenv from 'dotenv';
import express, {
    Request,
    Response,
} from 'express';

dotenv.config();

// Create an instance of express to serve our end points
const app = express();

// Define the port we're going to listen for
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route that sends back a hello message
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express and TypeScript!' });
});

// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});