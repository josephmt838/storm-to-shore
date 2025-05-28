import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useProtectedApi(apiCall) {
    const { isAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuth) {
            router.push('/login');
        }
    }, [isAuth, router]);

    return apiCall;
}
