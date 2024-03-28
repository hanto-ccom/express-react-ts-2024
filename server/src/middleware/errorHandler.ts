// error-handler.middleware.ts
import {
    NextFunction,
    Request,
    Response,
} from 'express';

export interface CustomError extends Error {
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

// Extending HttpError to include an errorCode
export class DetailedHttpError extends HttpError {
    errorCode: string;

    constructor(message: string, status: number, errorCode: string) {
        super(message, status);
        this.errorCode = errorCode;
    }
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'An unexpected error occurred';
    const errorCode = (err as DetailedHttpError).errorCode;
    console.error('Error:', err);
    res.status(status).json({ message, errorCode });
};