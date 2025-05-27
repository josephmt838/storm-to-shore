import { QueryClient } from '@tanstack/react-query';
import { API_URL } from './constants.js';

async function throwIfResNotOk(res) {
    if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
    }
}

export async function apiRequest(method, path, data) {
    const url = `${API_URL}${path}`;
    const res = await fetch(url, {
        method,
        headers: data ? { 'Content-Type': 'application/json' } : {},
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'omit',
        cache: 'no-store',
    });

    await throwIfResNotOk(res);
    return res;
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
