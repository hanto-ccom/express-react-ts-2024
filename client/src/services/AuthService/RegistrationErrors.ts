export class RegistrationError extends Error {
    errorCode?: string;

    constructor(message: string = 'Error registering', errorCode?: string) {
        super(message)
        this.name = 'AuthServiceError' //for logging purposes
        this.errorCode = errorCode
    }
}

export class UserExistError extends RegistrationError {
    constructor(message = 'User exists', errorCode?: string) {
        super(message, errorCode);
        this.name = "UserInputError"; // (e.g., missing or invalid fields)

    }
}

export interface ErrorResponse {
    message: string;
    errorCode?: string;
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
    switch (error.errorCode) {
        case 'UsernameExists':
            return "The username is already taken. Please choose another one.";
        case 'EmailExists':
            return "An account with this email already exists. Please use a different email.";
        default:
            return error.message || "An unexpected error occurred during registration. Please try again later.";
    }
};