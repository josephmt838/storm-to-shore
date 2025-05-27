import { FaShieldAlt } from 'react-icons/fa';

export function AdminHeader() {
    return (
        <div className='text-center mb-8'>
            <FaShieldAlt className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
            <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                Discipleship Admin Dashboard
            </h1>
            <p className='text-lg text-navy-600'>
                Manage prayer requests and contact messages for Storm to Shore Displeship
            </p>
        </div>
    );
} 