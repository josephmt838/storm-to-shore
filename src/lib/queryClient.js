import { QueryClient } from '@tanstack/react-query';
import { getAuthHeader } from './cognito';
import { API_URL } from './constants.js';

async function throwIfResNotOk(res) {
    if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
    }
}

export async function apiRequest(method, path, data) {
    const url = `${API_URL}${path}`;

    try {
        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        };

        const res = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
            cache: 'no-store',
        });

        if (!res.ok) {
            const text = (await res.text()) || res.statusText;
            throw new Error(`${res.status}: ${text}`);
        }

        return res;
    } catch (error) {
        if (error.message.includes('401')) {
            // Handle unauthorized access
            window.location.href = '/';
        }
        throw error;
    }
}

export const getQueryFn = () => {
    return async ({ queryKey }) => {
        const response = await apiRequest('GET', queryKey[0]);
        return response.json();
    };
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: getQueryFn(),
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            gcTime: 5 * 60 * 1000, // 5 minutes
        },
        mutations: {
            retry: 1,
        },
    },
});
