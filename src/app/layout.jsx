'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Merriweather, Playfair } from 'next/font/google';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { Toaster } from '../components/ui/toaster';
import './globals.css';

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
});

const fairplay = Playfair({
    subsets: ['latin'],
    variable: '--font-bible',
});

export default function RootLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html
            lang='en'
            className={`${merriweather.className} ${fairplay.variable}`}
        >
            <head>
                <link
                    rel='icon'
                    href='/favicon.svg'
                    type='image/svg+xml'
                />
                <title>Storm to Shore</title>
                <meta
                    name='description'
                    content="A Christ-centered discipleship helping people navigate life's storms and find peace in God's presence."
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <div id='banner-root'></div>
                        <div className='min-h-screen bg-navy-50 flex flex-col'>
                            <Navigation />
                            <main className='flex-1'>{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
