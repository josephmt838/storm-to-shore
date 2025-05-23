'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPublicApprovedPrayers } from '@/lib/mockData';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar, FaHeart, FaUsers } from 'react-icons/fa';
import { PiHandsPraying } from 'react-icons/pi';

export default function PrayerWall() {
    const { data: prayers = [], isLoading } = useQuery({
        queryKey: ['/api/prayers/public'],
        queryFn: () => getPublicApprovedPrayers(),
    });

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
                                                <span className='flex items-center gap-1'>
                                                    <FaHeart className='w-6 h-6 text-ocean-500' />
                                                    {prayer.name || 'Anonymous'}
                                                </span>
                                                <span className='flex items-center gap-1'>
                                                    <FaCalendar className='w-6 h-6 text-ocean-500' />
                                                    {new Date(
                                                        prayer.createdAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge className='bg-ocean-100 text-ocean-700 border-ocean-200'>
                                            Praying
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className='p-6'>
                                    <p className='text-navy-600 leading-relaxed whitespace-pre-wrap'>
                                        {prayer.content}
                                    </p>
                                    {prayer.count && (
                                        <div className='mt-4 p-3 bg-ocean-50 border border-ocean-200 rounded-md'>
                                            <p className='text-sm text-ocean-700'>
                                                <PiHandsPraying /> +{count}
                                            </p>
                                        </div>
                                    )}
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
                        <p className='text-navy-600 mb-4'>
                            "Again, truly I tell you that if two of you on earth
                            agree about anything they ask for, it will be done
                            for them by my Father in heaven. For where two or
                            three gather in my name, there am I with them."
                        </p>
                        <cite className='text-ocean-600 font-semibold'>
                            — Matthew 18:19-20
                        </cite>
                    </div>
                </div>
            </div>
        </div>
    );
}
