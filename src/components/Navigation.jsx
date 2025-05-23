import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaAnchor, FaBars } from 'react-icons/fa';
import { PiHandsPrayingFill } from 'react-icons/pi';

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/prayer-wall', label: 'Prayer Wall' },
        { href: '/about', label: 'About' },
        { href: '/media', label: 'Media' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (href) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <header className='bg-white shadow-sm sticky top-0 z-50'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link
                        href='/'
                        className='flex-shrink-0 flex items-center'
                    >
                        <div className='flex items-center space-x-3'>
                            <div className='w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center'>
                                <FaAnchor
                                    className='text-white text-lg'
                                    size={20}
                                />
                            </div>
                            <span className='text-xl font-semibold text-navy-900'>
                                PREVIEW ONLY
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:block'>
                        <div className='ml-10 flex justify-center items-baseline space-x-8'>
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
                            <Link href='/prayer-submit'>
                                <Button className='bg-ocean-500 hover:bg-ocean-600 text-white hidden lg:block'>
                                    Submit Prayer
                                </Button>
                                <PiHandsPrayingFill className='lg:hidden block' />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <Sheet
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                >
                                    <FaBars className='h-6 w-6 text-navy-600' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetTitle className='sr-only'>
                                    Navigation Menu
                                </SheetTitle>
                                <SheetDescription className='sr-only'>
                                    Mobile navigation menu for Storm to Shore
                                    website
                                </SheetDescription>
                                <div className='flex flex-col space-y-4 mt-8'>
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-base font-medium px-3 py-2 rounded-md transition-colors ${
                                                isActive(item.href)
                                                    ? 'text-ocean-600 bg-ocean-50'
                                                    : 'text-navy-600 hover:text-ocean-600 hover:bg-navy-50'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <Link
                                        href='/prayer/submit'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button className='w-full bg-ocean-500 hover:bg-ocean-600 text-white mt-4'>
                                            Submit Prayer
                                        </Button>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}
