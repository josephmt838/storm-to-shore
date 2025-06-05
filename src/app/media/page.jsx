'use client';

import CategorySection from '@/components/media/CategorySection';
import MediaCard from '@/components/media/MediaCard';
import MediaCTA from '@/components/media/MediaCTA';
import MediaHeader from '@/components/media/MediaHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FaBookOpen, FaPlay, FaVideo } from 'react-icons/fa';

export default function Media() {
    const { toast } = useToast();
    const { data: media = [], isLoading } = useQuery({
        queryKey: ['/media'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'media');

            return response.json();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to fetch media items. Please try again.',
                variant: 'destructive',
            });
        },
    });
    const featuredContent = media.filter((item) => item.featured);
    const regularContent = media.filter((item) => !item.featured);

    return (
        <>
            <div className='bg-navy-50 py-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <MediaHeader
                        title='Media Library'
                        description="Find sermons, devotionals, testimonies, and worship resources to help you navigate life's storms. Our media library is designed to strengthen your faith journey through various forms of content."
                        icon={
                            <FaPlay className='w-10 sm:w-12 h-10 sm:h-12 mx-auto text-ocean-500 mb-4' />
                        }
                    />

                    {/* Featured Content */}
                    <section className='mb-12'>
                        <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                            <FaBookOpen className='w-6 h-6 text-ocean-500' />
                            Featured Content
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {isLoading ? (
                                <Skeleton className={'w-full min-h-[200px]'} />
                            ) : (
                                featuredContent.map((item) => (
                                    <MediaCard
                                        key={item.id}
                                        item={item}
                                        isFeatured={true}
                                        type='media'
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {/* All Content */}
                    <section>
                        <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                            <FaVideo className='w-6 h-6 text-ocean-500' />
                            All Media Content
                        </h2>
                        <div className='grid gap-6'>
                            {isLoading ? (
                                <Skeleton className={'w-full min-h-[200px]'} />
                            ) : (
                                regularContent.map((item) => (
                                    <MediaCard
                                        key={item.id}
                                        item={item}
                                        type='media'
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    <CategorySection />
                    <MediaCTA />
                </div>
            </div>
        </>
    );
}
