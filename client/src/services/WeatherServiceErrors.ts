export class WeatherServiceError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'WeatherServiceError'
    }
}

export class NotFoundError extends WeatherServiceError {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class UnauthorizedError extends WeatherServiceError {
    constructor(message: string) {
        super(message)
        this.name = 'UnauthorizedError'
    }
}


export const handleWeatherErrors = (error: unknown, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    // Assuming all custom errors extend WeatherServiceError
    if (error instanceof WeatherServiceError) {
        console.error(error.message);
        const friendlyError = getUserFriendlyErrorMessage(error)
        setError && setError(friendlyError);
    } else {
        // For errors not of type WeatherServiceError, log them and set a generic error
        const genericError = new WeatherServiceError('Unexpected error occurred while fetching weather data.');
        console.error(genericError.message);
        setError && setError(genericError.message);
    }
}

const getUserFriendlyErrorMessage = (error: WeatherServiceError): string => {
    if (error instanceof NotFoundError) {
        return "We couldn't find the city you were looking for. Please check the spelling and try again.";
    } else if (error instanceof UnauthorizedError) {
        return "There seems to be a problem with your access rights. Please try logging in again.";
    } else {
        return "An unexpected issue occurred while trying to fetch weather data. Please try again later.";
    }
}