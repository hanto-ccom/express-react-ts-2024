import axios, { AxiosInstance } from 'axios';

interface CreateAxiosClientOptions {
    baseURL?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultParams?: any;
    authToken?: string; // OAuth token
    axiosInstance?: AxiosInstance; // Optional Axios instance
}

/**
 * Creates and configures an Axios instance.
 * @param baseURL Optional base URL for the Axios instance.
 * @returns Configured Axios instance.
 */

export const createAxiosClient = ({ baseURL = '', defaultParams = {}, authToken = '', axiosInstance }: CreateAxiosClientOptions): AxiosInstance => {
    const instance = axiosInstance || axios.create({
        baseURL: baseURL || '', // Use the provided base URL or default to an empty string
        params: defaultParams,
        headers: {
            'Content-Type': 'application/json',
            // Automatically add the Authorization header if an authToken is provided
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            // Add more default headers if needed
        },
        // You can add more default settings here
    });

    // Example of adding an interceptor for requests
    instance.interceptors.request.use((config) => {
        // Perform actions before request is sent, e.g., adding authentication tokens
        // Example: Attach or modify the Authorization header if needed
        // This could be used for scenarios where the authToken might be refreshed outside of this setup
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    });

    // Example of adding an interceptor for responses
    instance.interceptors.response.use(
        (response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            return response;
        },
        (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            //Example 404:
            if (error.response && error.response.status === 404) {
                console.error(`Request error status 404 `, error);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

