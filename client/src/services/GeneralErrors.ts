export class NetworkOrUnknownError extends Error {
    constructor(message: string = 'A network or unknown error occurred.') {
        super(message); // Pass the message to the parent Error constructor
        this.name = 'NetworkOrUnknownError'; // Set the error name to the class name

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NetworkOrUnknownError);
        }
    }
}