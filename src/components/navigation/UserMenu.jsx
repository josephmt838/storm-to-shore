'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import UserAdminMenu from './UserAdminMenu';

export function UserMenu() {
    const pathname = usePathname();
    const { signOut, userRole } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='p-2 hover:bg-navy-50 rounded-md transition-colors'>
                    <IoPersonSharp className={`h-5 w-5 focus:none`} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='w-48'
            >
                <DropdownMenuItem asChild>
                    <Link
                        href='/profile'
                        className='flex items-center'
                    >
                        <FaUser className='mr-2 h-4 w-4' />
                        Profile
                    </Link>
                </DropdownMenuItem>
                {userRole === 'admin' && <UserAdminMenu />}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className='flex items-center text-red-600 hover:text-red-700 hover:bg-red-50'
                >
                    <FaSignOutAlt className='mr-2 h-4 w-4' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
