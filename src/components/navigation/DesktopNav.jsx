'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { navItemDropdowns, navItems } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { PiHandsPrayingFill } from 'react-icons/pi';
import { UserMenu } from './UserMenu';

export function DesktopNav() {
    const pathname = usePathname();
    const { isAuth } = useAuth();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const isActive = (path) => pathname === path;

    return (
        <div className='hidden md:block'>
            <div className='ml-5 flex justify-center items-center space-x-2'>
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
                {navItemDropdowns.map((item) => (
                    <div
                        key={item.label}
                        className='relative group'
                        onMouseEnter={() => setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            className={`px-3 py-2 text-sm text-center font-medium transition-colors ${
                                activeDropdown === item.label
                                    ? 'text-ocean-600 border-b-2 border-ocean-600'
                                    : 'text-navy-600 hover:text-ocean-600'
                            }`}
                        >
                            {item.label}
                        </button>
                        <div className='absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                            <div
                                className='py-1'
                                role='menu'
                                aria-orientation='vertical'
                            >
                                {item.dropdown.map((subItem) => (
                                    <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className={`block px-4 py-2 text-sm ${
                                            isActive(subItem.href)
                                                ? 'bg-ocean-50 text-ocean-600'
                                                : 'text-navy-600 hover:bg-ocean-50 hover:text-ocean-600'
                                        }`}
                                        role='menuitem'
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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
                            <Button
                                variant='outline'
                                className='border-navy-200 text-navy-600 hover:bg-navy-50 hover:text-navy-700'
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href='/register'>
                            <Button className='bg-ocean-500 hover:bg-ocean-600 text-white shadow-sm'>
                                Register
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
