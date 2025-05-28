import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APPROVED, PENDING } from '@/lib/constants';
import { FaCheck, FaClock, FaHeart } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

export function StatsCards({ prayers, contacts }) {
    return (
        <div className='grid md:grid-cols-4 gap-6 mb-8'>
            <Card className='border-2 border-navy-200'>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-sm text-navy-600'>
                        Total Prayer Requests
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center gap-2'>
                        <FaHeart className='w-6 h-6 text-ocean-500' />
                        <span className='text-2xl font-bold text-navy-700'>
                            {prayers.length}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-2 border-navy-200'>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-sm text-navy-600'>
                        Pending Review
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center gap-2'>
                        <FaClock className='w-6 h-6 text-ocean-500' />
                        <span className='text-2xl font-bold text-navy-700'>
                            {
                                prayers.filter(
                                    (p) => p.prayerStatus === PENDING,
                                ).length
                            }
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-2 border-navy-200'>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-sm text-navy-600'>
                        Approved
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center gap-2'>
                        <FaCheck className='w-6 h-6 text-green-500' />
                        <span className='text-2xl font-bold text-navy-700'>
                            {
                                prayers.filter(
                                    (p) => p.prayerStatus === APPROVED,
                                ).length
                            }
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-2 border-navy-200'>
                <CardHeader className='pb-2'>
                    <CardTitle className='text-sm text-navy-600'>
                        Contact Messages
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center gap-2'>
                        <IoMail className='w-6 h-6 text-navy-500' />
                        <span className='text-2xl font-bold text-navy-700'>
                            {contacts.length || 0}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
