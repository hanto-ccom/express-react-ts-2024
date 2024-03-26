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


export const handleAuthErrors = (error: unknown, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    // Assuming all custom errors extend WeatherServiceError
    if (error instanceof AuthServiceError) {
        console.error(error.message);
        const friendlyError = getUserFriendlyErrorMessage(error)
        setError && setError(friendlyError);
    } else {
        // For errors not of type WeatherServiceError, log them and set a generic error
        const genericError = new AuthServiceError('Unexpected error occurred while fetching user data.');
        console.error(genericError.message);
        setError && setError(genericError.message);
    }
}

const getUserFriendlyErrorMessage = (error: AuthServiceError): string => {
    if (error instanceof NotFoundError) {
        return "The user does not exist";
    } else if (error instanceof UnauthorizedError) {
        return "Wrong username or password. Please try again.";
    } else {
        return "An unexpected issue occurred while trying to fetch user data. Please try again later.";
    }
}
