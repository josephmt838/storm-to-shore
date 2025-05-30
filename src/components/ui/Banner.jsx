'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Banner({ children, className = '' }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(() => true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const bannerContent = (
        <div
            className={`w-full bg-blue-600 text-white py-2 px-4 text-center ${className}`}
        >
            {children}
        </div>
    );

    // Create a portal to render the banner at the top of the body
    return createPortal(bannerContent, document.getElementById('banner-root'));
}
