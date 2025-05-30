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
import { navItemDropdowns, navItems } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    FaBars,
    FaChevronDown,
    FaChevronUp,
    FaSignOutAlt,
} from 'react-icons/fa';

export function MobileMenu() {
    const pathname = usePathname();
    const { isAuth, signOut, userRole } = useAuth();
    const [open, setOpen] = useState(false);
    const [expandedDropdowns, setExpandedDropdowns] = useState({});

    const handleSignOut = async () => {
        await signOut();
        setOpen(false);
    };

    const isActive = (path) => pathname === path;
    const closeMenu = () => setOpen(false);

    const toggleDropdown = (label) => {
        setExpandedDropdowns((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <div className='flex items-center md:hidden'>
            <Sheet
                open={open}
                onOpenChange={setOpen}
            >
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
                                onClick={closeMenu}
                                className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                    isActive(item.href)
                                        ? 'text-ocean-600 bg-ocean-50'
                                        : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        {navItemDropdowns.map((item) => (
                            <div
                                key={item.label}
                                className='flex flex-col'
                            >
                                <button
                                    onClick={() => toggleDropdown(item.label)}
                                    className={`text-base font-medium px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                                        expandedDropdowns[item.label]
                                            ? 'text-ocean-600 bg-ocean-50'
                                            : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                    }`}
                                >
                                    {item.label}
                                    {expandedDropdowns[item.label] ? (
                                        <FaChevronUp className='h-4 w-4' />
                                    ) : (
                                        <FaChevronDown className='h-4 w-4' />
                                    )}
                                </button>
                                {expandedDropdowns[item.label] && (
                                    <div className='pl-4 space-y-2 mt-2'>
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                onClick={closeMenu}
                                                className={`block text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                                    isActive(subItem.href)
                                                        ? 'text-ocean-600 bg-ocean-50'
                                                        : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                                }`}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isAuth && (
                            <>
                                <Link
                                    href='/profile'
                                    onClick={closeMenu}
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
                                        onClick={closeMenu}
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
                                    onClick={closeMenu}
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
                                    onClick={closeMenu}
                                    className='text-base font-medium px-3 py-2 rounded-md border border-navy-200 text-navy-600 hover:bg-navy-50 hover:text-navy-700 transition-colors text-center'
                                >
                                    Login
                                </Link>
                                <Link
                                    href='/register'
                                    onClick={closeMenu}
                                    className='text-base font-medium px-3 py-2 rounded-md bg-ocean-500 text-white hover:bg-ocean-600 shadow-sm transition-colors text-center'
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
