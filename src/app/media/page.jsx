'use client';

import CategorySection from '@/components/media/CategorySection';
import MediaCard from '@/components/media/MediaCard';
import MediaCTA from '@/components/media/MediaCTA';
import MediaHeader from '@/components/media/MediaHeader';
import Banner from '@/components/ui/Banner';
import { mediaContent } from '@/data/media';
import { FaBookOpen, FaVideo } from 'react-icons/fa';

export default function Media() {
    const featuredContent = mediaContent.filter((item) => item.featured);
    const regularContent = mediaContent.filter((item) => !item.featured);

    return (
        <>
            <Banner>
                <section className='w-full flex items-center justify-center gap-2'>
                    <p className='font-bold'>DEMO</p>
                    <p>Real content as soon as possible</p>
                </section>
            </Banner>
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <MediaHeader />

                    {/* Featured Content */}
                    {featuredContent.length > 0 && (
                        <section className='mb-12'>
                            <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                                <FaBookOpen className='w-6 h-6 text-ocean-500' />
                                Featured Content
                            </h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                {featuredContent.map((item) => (
                                    <MediaCard
                                        key={item.id}
                                        item={item}
                                        isFeatured={true}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All Content */}
                    <section>
                        <h2 className='text-2xl font-bold text-navy-700 mb-6 flex items-center gap-2'>
                            <FaVideo className='w-6 h-6 text-ocean-500' />
                            All Media Content
                        </h2>
                        <div className='grid gap-6'>
                            {regularContent.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    </section>

                    <CategorySection />
                    <MediaCTA />
                </div>
            </div>
        </>
    );
}
