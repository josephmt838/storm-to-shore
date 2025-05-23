'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { Toaster } from '../components/ui/toaster';
import './globals.css';

export default function RootLayout({ children }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000, // 5 minutes
                        retry: 1,
                    },
                },
            }),
    );

    return (
        <html lang='en'>
            <head>
                <title>Storm to Shore</title>
                <meta
                    name='description'
                    content="A Christ-centered ministry helping people navigate life's storms and find peace in God's presence."
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <div className='min-h-screen bg-navy-50 flex flex-col'>
                        <Navigation />
                        <main className='flex-1'>{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </QueryClientProvider>
            </body>
        </html>
    );
}
