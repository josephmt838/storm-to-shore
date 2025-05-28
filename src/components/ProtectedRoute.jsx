'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }) {
    const { isAuth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuth) {
            router.push('/login');
        }
    }, [isAuth, loading, router]);

    if (loading) {
        return (
            <div className='min-h-screen bg-navy-50 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-500 mx-auto'></div>
                    <p className='mt-4 text-navy-700'>Loading...</p>
                </div>
            </div>
        );
    }

    return isAuth ? children : null;
}
