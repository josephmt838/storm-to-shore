'use client';

import MediaCard from '@/components/media/MediaCard';
import MediaCTA from '@/components/media/MediaCTA';
import MediaHeader from '@/components/media/MediaHeader';
import Banner from '@/components/ui/Banner';
import { mediaContent } from '@/data/media';
import { FaBookOpen, FaFileAlt } from 'react-icons/fa';

export default function Articles() {
    // Filter content to only show articles and resources
    const articlesContent = mediaContent.filter(
        (item) => item.type === 'article' || item.type === 'resource',
    );

    const featuredArticles = articlesContent.filter((item) => item.featured);
    const regularArticles = articlesContent.filter((item) => !item.featured);

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <Banner>
                <section className='w-full flex items-center justify-center gap-2'>
                    <p className='font-bold'>DEMO</p>
                    <p>Real content as soon as possible</p>
                </section>
            </Banner>
            <div className='max-w-6xl mx-auto'>
                <MediaHeader
                    title='Articles & Resources'
                    description='Explore written studies, devotionals, and helpful tools for your faith journey.'
                />

                {/* Featured Articles */}
                {featuredArticles.length > 0 && (
                    <section className='mb-12'>
                        <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                            <FaBookOpen className='w-6 h-6 text-ocean-500' />
                            Featured Articles
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {featuredArticles.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    isFeatured={true}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Articles */}
                <section>
                    <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                        <FaFileAlt className='w-6 h-6 text-ocean-500' />
                        All Articles & Resources
                    </h2>
                    <div className='grid gap-6'>
                        {regularArticles.map((item) => (
                            <MediaCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </section>

                <MediaCTA />
            </div>
        </div>
    );
}
