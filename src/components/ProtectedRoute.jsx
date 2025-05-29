'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingIcon } from './ui/loading-icon';

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
                    <LoadingIcon size='xl' />
                </div>
            </div>
        );
    }

    return isAuth ? children : null;
}
