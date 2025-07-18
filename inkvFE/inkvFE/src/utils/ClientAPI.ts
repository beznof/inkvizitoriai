import { loadEnv } from 'vite';

const API_URL = import.meta.env.VITE_API_URL;

const useAPI = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const requestConfig: RequestInit = {
        ...options,
        headers: {
            ...options.headers
        },
        credentials: "include",
    }

    const response = await fetch(`${API_URL}/${endpoint}`, requestConfig);
    return response;
}

export default useAPI;