export class RegistrationError extends Error {
    constructor(message: string = 'Error registering') {
        super(message)
        this.name = 'AuthServiceError' //for logging purposes
    }
}

export class UserExistError extends RegistrationError {
    constructor(message = 'User exists') {
        super(message);
        this.name = "UserInputError"; // (e.g., missing or invalid fields)
    }
}

export const handleRegistrationErrors = (error: unknown, setError?: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    if (error instanceof RegistrationError) {
        console.error(error.message);
        const friendlyError = getUserFriendlyRegistrationErrorMessage(error)
        setError && setError(friendlyError);
    } else {
        // For errors not of type WeatherServiceError, log them and set a generic error
        const genericError = new RegistrationError('Unexpected error occurred while fetching user data.');
        console.error(genericError.message);
        setError && setError(genericError.message);
    }
}

const getUserFriendlyRegistrationErrorMessage = (error: RegistrationError): string => {
    if (error instanceof UserExistError) {
        return "The user already exists. Please retry with a different userame";
    } else {
        return "An unexpected error occurred while trying to regiser. Please try again later.";
    }
};