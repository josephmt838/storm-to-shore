import { FaShieldAlt } from 'react-icons/fa';

export function AdminHeader({ headline, pulse = false }) {
    return (
        <div className='text-center mb-8'>
            <FaShieldAlt
                className={`w-12 h-12 mx-auto text-ocean-500 mb-4 ${
                    pulse ? 'animate-pulse' : ''
                }`}
            />
            <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                Discipleship Admin Dashboard
            </h1>
            <p className='text-lg text-navy-600'>{headline}</p>
        </div>
    );
}
