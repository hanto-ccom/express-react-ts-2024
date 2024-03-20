// error-handler.middleware.ts
import {
    NextFunction,
    Request,
    Response,
} from 'express';

interface CustomError extends Error {
    status?: number;
}

export class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred';
    console.error('Error:', err);
    res.status(status).json({ message });
};