'use client';

import Link from 'next/link';
import { FaAnchor } from 'react-icons/fa';

export function Logo() {
    return (
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
                    Storm To Shore
                </span>
            </div>
        </Link>
    );
}
