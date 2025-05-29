'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Prayer Wall', href: '/prayer-wall' },
    { label: 'Contact', href: '/contact' },
    { label: 'Media', href: '/media' },
];

export function MobileMenu() {
    const pathname = usePathname();
    const { isAuth, signOut, userRole } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    const isActive = (path) => pathname === path;

    return (
        <div className='flex items-center md:hidden'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant='ghost'
                        className='p-2 rounded-md text-navy-600 hover:text-ocean-600 hover:bg-white'
                    >
                        <FaBars className='h-6 w-6' />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side='right'
                    className='w-[300px] sm:w-[400px]'
                >
                    <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                    <SheetDescription className='sr-only'>
                        Mobile navigation menu for Storm to Shore website
                    </SheetDescription>
                    <div className='flex flex-col space-y-4 mt-8'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                    isActive(item.href)
                                        ? 'text-ocean-600 bg-ocean-50'
                                        : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {isAuth && (
                            <>
                                <Link
                                    href='/profile'
                                    className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                        isActive('/profile')
                                            ? 'text-ocean-600 bg-ocean-50'
                                            : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                    }`}
                                >
                                    Profile
                                </Link>
                                {userRole === 'admin' && (
                                    <Link
                                        href='/admin'
                                        className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                            isActive('/admin')
                                                ? 'text-ocean-600 bg-ocean-50'
                                                : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                        }`}
                                    >
                                        Admin
                                    </Link>
                                )}
                                <Link
                                    href='/prayer-submit'
                                    className='text-base font-medium px-3 py-2 rounded-md bg-ocean-500 text-white hover:bg-ocean-600 transition-colors'
                                >
                                    Submit Prayer
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className='text-base font-medium px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left flex items-center'
                                >
                                    <FaSignOutAlt className='mr-2 h-4 w-4' />
                                    Logout
                                </button>
                            </>
                        )}
                        {!isAuth && (
                            <>
                                <Link
                                    href='/login'
                                    className='text-base font-medium px-3 py-2 rounded-md text-navy-600 hover:text-ocean-600 hover:bg-navy-50 transition-colors'
                                >
                                    Login
                                </Link>
                                <Link
                                    href='/register'
                                    className='text-base font-medium px-3 py-2 rounded-md text-navy-600 hover:text-ocean-600 hover:bg-navy-50 transition-colors'
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
