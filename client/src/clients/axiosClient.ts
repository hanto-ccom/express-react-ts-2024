import axios, { AxiosInstance } from 'axios';

import { RefreshAccessToken } from '../utilities/RefreshToken';

interface CreateAxiosClientOptions {
    baseURL?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultParams?: Record<string, any>;
    authToken?: string; // OAuth token
    axiosInstance?: AxiosInstance; // Optional Axios instance
}

const createAxiosClient = ({ baseURL = "", defaultParams = {}, authToken = "", axiosInstance }: CreateAxiosClientOptions): AxiosInstance => {
    //enables passing in a mocked instance for testing
    const instance = axiosInstance || axios.create({
        baseURL,
        params: defaultParams,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            //add more headers if needed
        },
        withCredentials: true
    });





    // - Response Interceptor
    instance.interceptors.response.use(
        (response) => response, //2xx - all good
        async (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // Check if it's a login request / refresh request or if a refresh attempt has already been made
                        if (error.config.url.includes('/login') || !error.config.url.includes('/authentication/token') || error.config._retry) {
                            // For login requests or already retried requests, don't attempt to refresh the token
                            return Promise.reject(error);
                        }

                        // Handle token refresh, user redirection, or emit an event here             
                        if (!error.config._retry) {
                            // Mark this request as having been retried
                            error.config._retry = true;

                            try {
                                console.log("trying to get refreshtoken via axiosinterceptor for 401")
                                await RefreshAccessToken();
                                return instance(error.config)
                            } catch (refreshError) {
                                //handle failed refesh                                
                                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
                                return Promise.reject(refreshError);
                            }
                        }

                        break;
                    case 404:
                        console.error("Not Found - 404", error);
                        // Handle 404 specific actions
                        break;
                    // Add more cases as needed
                    default:
                        console.error(`Error: ${error.response.status}`, error);
                }
            } else {
                // Handle errors not directly related to the HTTP response (network errors, etc.)
                console.error("An error occurred", error);
            }
            return Promise.reject(error); //handles unresolved errors
        }
    );



    return instance;
}

export default createAxiosClient;
