import { NetworkOrUnknownError } from '../GeneralErrors';

export class AuthServiceError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthServiceError' //for logging purposes
    }
}

export class NotFoundError extends AuthServiceError {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class UnauthorizedError extends AuthServiceError {
    constructor(message: string) {
        super(message)
        this.name = 'UnauthorizedError'
    }
}

export class TokenExpiredError extends AuthServiceError {
    constructor(message: string = 'The token has expired. Please log in again.') {
        super(message);
        this.name = 'TokenExpiredError';
    }
}

export class TokenInvalidError extends AuthServiceError {
    constructor(message: string = 'The refresh token is invalid. Please log in again.') {
        super(message);
        this.name = 'TokenInvalidError';
    }
}

export class TokenRefreshNetworkError extends AuthServiceError {
    constructor(message: string = "A network error occurred while trying to refresh the token. Please check your internet connection.") {
        super(message);
        this.name = 'TokenRefreshNetworkError';
    }
}



export const handleAuthErrors = (error: unknown, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    // Assuming all custom errors extend WeatherServiceError
    if (error instanceof AuthServiceError) {
        console.error(error.message);
        const friendlyError = getUserFriendlyAuthErrorMessage(error)
        setError && setError(friendlyError);
    } else {
        // For errors not of type WeatherServiceError, log them and set a generic error
        const genericError = new AuthServiceError('Unexpected error occurred while fetching user data.');
        console.error(genericError.message);
        setError && setError(genericError.message);
    }
}

const getUserFriendlyAuthErrorMessage = (error: AuthServiceError): string => {
    if (error instanceof NotFoundError) {
        return "The user does not exist.";
    } else if (error instanceof UnauthorizedError) {
        return "Wrong username or password. Please try again.";
    } else if (error instanceof TokenExpiredError) {
        return "Your session has expired. Please log in again.";
    } else if (error instanceof TokenInvalidError) {
        return "There's a problem with your session. Please log in again.";
    } else if (error instanceof TokenRefreshNetworkError || error instanceof NetworkOrUnknownError) {
        return "We're having trouble connecting to the server right now. Please check your internet connection and try again.";
    } else {
        return "An unexpected error occurred while trying to authenticate. Please try again later.";
    }
};