'use client';

import MediaCard from '@/components/media/MediaCard';
import MediaCTA from '@/components/media/MediaCTA';
import MediaHeader from '@/components/media/MediaHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FaBookOpen, FaFileAlt } from 'react-icons/fa';

export default function Articles() {
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['/articles'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'articles');
            return response.json();
        },
    });

    const featuredArticles = articles.filter((item) => item.featured);
    const regularArticles = articles.filter((item) => !item.featured);

    return (
        <div className='bg-navy-50 py-12 px-4'>
            <div className='max-w-6xl mx-auto'>
                <MediaHeader
                    title='Articles & Resources'
                    description='Explore written studies, devotionals, and helpful tools for your faith journey. Our articles provide in-depth biblical insights and practical resources to help you grow in your walk with Christ.'
                    icon={
                        <FaBookOpen className='w-10 sm:w-12 h-10 sm:h-12 mx-auto text-ocean-500 mb-4' />
                    }
                />

                {/* Featured Articles */}

                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                        <FaBookOpen className='w-6 h-6 text-ocean-500' />
                        Featured Articles
                    </h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {isLoading ? (
                            <Skeleton className='w-full min-h-[300px] flex items-center' />
                        ) : (
                            featuredArticles.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    isFeatured={true}
                                    type='article'
                                />
                            ))
                        )}
                    </div>
                </section>

                {/* All Articles */}
                <section>
                    <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                        <FaFileAlt className='w-6 h-6 text-ocean-500' />
                        All Articles & Resources
                    </h2>
                    <div className='grid gap-6'>
                        {isLoading ? (
                            <Skeleton className='w-full min-h-[300px] flex items-center' />
                        ) : (
                            regularArticles.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    type='article'
                                />
                            ))
                        )}
                    </div>
                </section>

                <MediaCTA />
            </div>
        </div>
    );
}
