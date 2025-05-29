'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdminProtectedRoute({ children }) {
    const { isAuth, loading, userRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!isAuth || userRole !== 'admin')) {
            router.push('/');
        }
    }, [isAuth, loading, userRole, router]);

    return isAuth && userRole === 'admin' ? children : null;
}
