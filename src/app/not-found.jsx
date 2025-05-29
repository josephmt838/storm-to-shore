'use client';

import { LoadingIcon } from '@/components/ui/loading-icon';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const router = useRouter();
    const pathname = usePathname();
    const [error, setError] = useState(false);

    useEffect(() => {
        // If we're already on the root path, show error
        if (pathname === '/') {
            setError(true);
            return;
        }

        // Try to navigate to the path using client-side routing
        const attemptNavigation = async () => {
            try {
                // First try a hard navigation
                window.location.href = pathname;

                // Set a timeout to show error if navigation hasn't completed
                const timeout = setTimeout(() => {
                    setError(true);
                }, 2000);

                return () => clearTimeout(timeout);
            } catch (err) {
                setError(true);
            }
        };

        attemptNavigation();
    }, [pathname]);

    if (error) {
        return (
            <div className='min-h-screen bg-navy-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-navy-700 mb-4'>
                        Page Not Found
                    </h1>
                    <p className='text-navy-600 mb-4'>
                        The page you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className='px-4 py-2 bg-ocean-500 text-white rounded hover:bg-ocean-600 transition-colors'
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 flex items-center justify-center'>
            <div className='text-center'>
                <LoadingIcon size='xl' />
            </div>
        </div>
    );
}
