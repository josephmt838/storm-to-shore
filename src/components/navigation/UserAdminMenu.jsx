'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { FaBook, FaCog, FaShieldAlt, FaVideo } from 'react-icons/fa';

const UserAdminMenu = () => {
    return (
        <>
            <hr />
            <DropdownMenuItem asChild>
                <Link
                    href='/admin'
                    className='flex items-center'
                >
                    <FaCog className='mr-2 h-4 w-4' />
                    Admin Dashboard
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link
                    href='/admin/moderate'
                    className='flex items-center'
                >
                    <FaShieldAlt className='mr-2 h-4 w-4' />
                    Moderate
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link
                    href='/admin/media'
                    className='flex items-center'
                >
                    <FaVideo className='mr-2 h-4 w-4' />
                    Media
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link
                    href='/admin/articles'
                    className='flex items-center'
                >
                    <FaBook className='mr-2 h-4 w-4' />
                    Articles
                </Link>
            </DropdownMenuItem>
        </>
    );
};

export default UserAdminMenu;
