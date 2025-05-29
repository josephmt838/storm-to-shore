'use client';

import { DesktopNav } from './navigation/DesktopNav';
import { Logo } from './navigation/Logo';
import { MobileMenu } from './navigation/MobileMenu';

export default function Navigation() {
    return (
        <header className='bg-white shadow-sm sticky top-0 z-50'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <Logo />
                    <DesktopNav />
                    <MobileMenu />
                </div>
            </nav>
        </header>
    );
}
