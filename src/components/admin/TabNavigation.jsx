import { Button } from '@/components/ui/button';
import { FaHeart } from 'react-icons/fa';
import { IoMailUnread } from 'react-icons/io5';

export function TabNavigation({ selectedTab, setSelectedTab }) {
    return (
        <div className='flex space-x-1 mb-8 bg-white p-1 rounded-lg border-2 border-navy-200'>
            <Button
                variant={selectedTab === 'prayers' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('prayers')}
                className={
                    selectedTab === 'prayers'
                        ? 'bg-ocean-500 text-white'
                        : 'text-navy-600'
                }
            >
                <FaHeart className='w-4 h-4 mr-2' />
                Prayer Requests
            </Button>
            <Button
                variant={selectedTab === 'contacts' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('contacts')}
                className={
                    selectedTab === 'contacts'
                        ? 'bg-ocean-500 text-white'
                        : 'text-navy-600'
                }
            >
                <IoMailUnread className='w-4 h-4 mr-2' />
                Contact Messages
            </Button>
        </div>
    );
} 