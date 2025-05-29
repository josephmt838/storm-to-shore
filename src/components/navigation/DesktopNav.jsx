'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiHandsPrayingFill } from 'react-icons/pi';
import { UserMenu } from './UserMenu';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Prayer Wall', href: '/prayer-wall' },
    { label: 'Contact', href: '/contact' },
    { label: 'Media', href: '/media' },
];

export function DesktopNav() {
    const pathname = usePathname();
    const { isAuth } = useAuth();

    const isActive = (path) => pathname === path;

    return (
        <div className='hidden md:block'>
            <div className='ml-5 flex justify-center items-center  space-x-2'>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-2 text-sm text-center font-medium transition-colors ${
                            isActive(item.href)
                                ? 'text-ocean-600 border-b-2 border-ocean-600'
                                : 'text-navy-600 hover:text-ocean-600'
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
                {isAuth && (
                    <>
                        <Link href='/prayer-submit'>
                            <Button className='bg-ocean-500 hover:bg-ocean-600 text-white hidden lg:block'>
                                Submit Prayer
                            </Button>
                            <PiHandsPrayingFill className='lg:hidden block' />
                        </Link>
                        <UserMenu />
                    </>
                )}
                {!isAuth && (
                    <>
                        <Link href='/login'>
                            <Button variant='ghost'>Login</Button>
                        </Link>
                        <Link href='/register'>
                            <Button variant='ghost'>Register</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
