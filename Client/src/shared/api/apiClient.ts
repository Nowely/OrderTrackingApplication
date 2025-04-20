import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { paths } from './orders.v1';
import { BaseUrl } from './BaseUrl.ts';

/**
 * Configuration for the API client
 */
const apiConfig = {
  baseUrl: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create a fetch client with request and response interceptors
 */
const createApiClient = () => {
  const fetchClient = createFetchClient<paths>(apiConfig);
  
  // Add request interceptor
  const originalFetch = fetchClient.fetch;
  fetchClient.fetch = async (url, init) => {
    // Log request for debugging
    console.debug(`API Request: ${init?.method || 'GET'} ${url}`);
    
    try {
      const response = await originalFetch(url, init);
      
      // Handle common response scenarios
      if (response.status >= 400) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        
        // Handle specific error codes
        if (response.status === 401) {
          // Handle unauthorized
          console.error('Unauthorized access. Please log in again.');
        } else if (response.status === 403) {
          // Handle forbidden
          console.error('You do not have permission to access this resource.');
        } else if (response.status === 404) {
          // Handle not found
          console.error('The requested resource was not found.');
        } else if (response.status >= 500) {
          // Handle server errors
          console.error('A server error occurred. Please try again later.');
        }
      }
      
      return response;
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      throw error;
    }
  };
  
  return fetchClient;
};

/**
 * API client with proper error handling and interceptors
 */
export const apiClient = createApiClient();

/**
 * React Query client for the API
 */
export const Api = createClient(apiClient);