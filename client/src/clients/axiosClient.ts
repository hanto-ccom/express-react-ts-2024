import axios, { AxiosInstance } from 'axios';

import {
    RefreshAccessToken,
    setAccessToken,
} from '../utilities/RefreshToken';

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
        }
    });

    //Interceptors
    // - Request
    instance.interceptors.request.use((config) => {
        //perform actions before request is sent
        //i.e refresh authToken on the header
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`
        }
        return config;
    })

    // - Response
    instance.interceptors.response.use(
        (response) => response, //2xx - all good
        async (error) => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        // Check if it's a login request or if a refresh attempt has already been made
                        if (error.config.url.includes('/login') || error.config._retry) {
                            // For login requests or already retried requests, don't attempt to refresh the token
                            return Promise.reject(error);
                        }

                        // Handle token refresh, user redirection, or emit an event here             
                        if (!error.config._retry) {
                            // Mark this request as having been retried
                            error.config._retry = true;

                            try {
                                console.log("trying to get refreshtoken via axiosinterceptor for 401")
                                const newAccessToken = await RefreshAccessToken();
                                console.log("new accessToken from interceptor: ", newAccessToken)
                                setAccessToken(newAccessToken)
                                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                                return instance(error.config)
                            } catch (refreshError) {
                                //handle failed refesh
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('refreshToken');
                                //window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
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
