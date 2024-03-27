import { NetworkOrUnknownError } from '../GeneralErrors';

export class UserServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserServiceError';
    }
}

export class UserNotFoundError extends UserServiceError {
    constructor(message: string = 'User not found') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

export class UserUnauthorizedError extends UserServiceError {
    constructor(message: string = 'Unauthorized access - Please login again') {
        super(message);
        this.name = 'UserUnauthorizedError';
    }
}

export class UnexpectedUserServiceError extends UserServiceError {
    constructor(message: string = 'Unexpected error occurred while fetching user data') {
        super(message);
        this.name = 'UnexpectedUserServiceError';
    }
}


export const handleUserErrors = (error: unknown, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    // Assuming all custom errors extend WeatherServiceError
    if (error instanceof UserServiceError) {
        console.error(error.message);
        const friendlyError = getUserFriendlyUserErrorMessage(error)
        setError && setError(friendlyError);
    } else {
        // For errors not of type WeatherServiceError, log them and set a generic error
        const genericError = new UserServiceError('Unexpected error occurred while fetching user data.');
        console.error(genericError.message);
        setError && setError(genericError.message);
    }
}

const getUserFriendlyUserErrorMessage = (error: UserServiceError): string => {
    if (error instanceof UserNotFoundError) {
        return "We couldn't find the user you were looking for. They may have deleted their account or never existed.";
    } else if (error instanceof UserUnauthorizedError) {
        return "You're not authorized to view this user's information. Please ensure you're logged in and have the correct permissions.";
    } else if (error instanceof NetworkOrUnknownError) {
        return "We're having trouble connecting to the server right now. Please check your internet connection and try again.";
    } else {
        return "An unexpected error occurred while trying to access user data. Please try again later.";
    }
}