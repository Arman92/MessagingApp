/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';

let previousInterceptor: number | null = null;

export const setInterceptors = (accessToken: string) => {
  // Remove previous interceptor if any:
  axios.interceptors.request.eject(previousInterceptor);

  // Add a request interceptor
  previousInterceptor = axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // TODO: Add response listener to refresh token if accessToken is expired
};
