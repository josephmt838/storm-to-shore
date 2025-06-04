'use client';

import { getTypeColor } from '@/components/media/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingIcon } from '@/components/ui/loading-icon';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar, FaClock, FaPlay } from 'react-icons/fa';

export default function MediaContent({ id }) {
    // Fetch single media item
    const { data: media, isLoading } = useQuery({
        queryKey: [`/media/${id}`],
        queryFn: async () => {
            const response = await apiRequest('GET', `media/${id}`);
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='w-full flex justify-center'>
                        <LoadingIcon size='xl' />
                    </div>
                </div>
            </div>
        );
    }

    if (!media) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <Card>
                        <CardContent className='p-8 text-center'>
                            <h1 className='text-2xl font-bold text-navy-700 mb-4'>
                                Media Not Found
                            </h1>
                            <p className='text-navy-600'>
                                The media item you're looking for doesn't exist
                                or has been removed.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-4xl mx-auto'>
                <Card className='border-2 border-navy-200'>
                    <CardContent className='p-8'>
                        <div className='mb-6'>
                            <Badge
                                className={`${getTypeColor(media.type)} mb-4`}
                            >
                                {media.category}
                            </Badge>
                            <h1 className='text-3xl font-bold text-navy-700 mb-4'>
                                {media.title}
                            </h1>
                            <div className='flex flex-wrap gap-4 text-sm text-navy-500'>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar className='w-4 h-4' />
                                    {new Date(media.date).toLocaleDateString()}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaClock className='w-4 h-4' />
                                    {media.duration}
                                </span>
                            </div>
                        </div>

                        {media.thumbnail && (
                            <div className='w-full aspect-video bg-navy-100 rounded-lg mb-6 flex items-center justify-center'>
                                <FaPlay className='w-16 h-16 text-navy-400' />
                            </div>
                        )}

                        <div className='prose prose-navy max-w-none'>
                            <p className='text-navy-600 mb-6'>
                                {media.description}
                            </p>

                            {/* Media Player Placeholder */}
                            <div className='w-full aspect-video bg-navy-100 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>
                                    <FaPlay className='w-12 h-12 text-navy-400 mx-auto mb-4' />
                                    <p className='text-navy-600'>
                                        {media.type === 'video'
                                            ? 'Video Player'
                                            : 'Audio Player'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
