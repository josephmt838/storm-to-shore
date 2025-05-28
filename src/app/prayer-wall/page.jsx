'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar, FaHeart, FaUsers } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { PiHandsPraying } from 'react-icons/pi';

export default function PrayerWall() {
    const { data: prayers = [], isLoading } = useQuery({
        queryKey: ['prayer/public'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'prayer/public');
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const handlePrayerCount = (prayer) => console.log(prayer);

    if (isLoading) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-8'>
                        <FaUsers className='w-12 h-12 mx-auto text-ocean-500 mb-4 animate-pulse' />
                        <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                            Prayer Wall
                        </h1>
                        <p className='text-lg text-navy-600'>
                            Loading prayer requests...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-8'>
                    <FaUsers className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Community Prayer Wall
                    </h1>
                    <p className='text-lg text-navy-600 max-w-2xl mx-auto'>
                        Join our community in prayer. These are public prayer
                        requests from fellow believers who have chosen to share
                        their needs with our church family.
                    </p>
                </div>

                {prayers.length === 0 ? (
                    <Card className='border-2 border-navy-200 text-center py-12'>
                        <CardContent>
                            <FaHeart className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                            <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                                No Public Prayer Requests Yet
                            </h3>
                            <p className='text-navy-500'>
                                Be the first to share a public prayer request
                                with our community.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className='space-y-6'>
                        {prayers.map((prayer) => (
                            <Card
                                key={prayer.id}
                                className='border-2 border-navy-200 hover:border-ocean-400 transition-colors shadow-md'
                            >
                                <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex-1'>
                                            <CardTitle className='text-navy-700 text-xl mb-2'>
                                                {prayer.title ||
                                                    'Prayer Request'}
                                            </CardTitle>
                                            <div className='flex items-center gap-4 text-sm text-navy-600'>
                                                <span className='flex items-center gap-2'>
                                                    <IoPerson className='w-6 h-6 text-ocean-500' />
                                                    {prayer.name || 'Anonymous'}
                                                </span>
                                                <span className='flex items-center gap-2'>
                                                    <FaCalendar className='w-6 h-6 text-ocean-500' />
                                                    {new Date(
                                                        prayer.date,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className='bg-ocean-100 text-ocean-700 border-ocean-200'>
                                            Praying
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className='pb-6'>
                                    <p className='text-navy-600 leading-relaxed whitespace-pre-wrap mb-2'>
                                        {prayer.text}
                                    </p>
                                    <p
                                        className='text-sm text-ocean-700 flex gap-2 items-center hover:cursor-pointer'
                                        onClick={() =>
                                            handlePrayerCount(prayer)
                                        }
                                    >
                                        <PiHandsPraying /> {prayer.count || 0}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className='mt-12 text-center'>
                    <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                        <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                            Praying Together
                        </h3>
                        <p className='font-bible text-navy-600 mb-4'>
                            "Again I say unto you, That if two of you shall
                            agree on earth as touching any thing that they shall
                            ask, it shall be done for them of my Father which is
                            in heaven. For where two or three are gathered
                            together in my name, there am I in the midst of
                            them."
                        </p>
                        <cite className='font-bible text-ocean-600 font-semibold'>
                            — Matthew 18:19-20 (KJV)
                        </cite>
                    </div>
                </div>
            </div>
        </div>
    );
}
