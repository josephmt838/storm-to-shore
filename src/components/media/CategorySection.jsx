import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaFileAlt, FaVideo, FaYoutube } from 'react-icons/fa';

export default function CategorySection() {
    const categories = [
        {
            icon: (
                <FaYoutube className='w-12 h-12 mx-auto text-ocean-500 mb-2' />
            ),
            title: 'Live Bible Readings',
            description:
                'Join our live sessions on YouTube to read, reflect, and grow through God’s Word.',
            buttonText: 'Watch Live',
            link: 'https://www.youtube.com/@StormToShoreDiscipleship',
            tab: true,
        },
        {
            icon: <FaVideo className='w-12 h-12 mx-auto text-ocean-500 mb-2' />,
            title: 'Video Teachings',
            description:
                'Watch biblical teachings, testimonies, and discipleship videos on our YouTube channel.',
            buttonText: 'Browse Videos',
            link: 'https://www.youtube.com/@StormToShoreDiscipleship',
            tab: true,
        },
        {
            icon: (
                <FaFileAlt className='w-12 h-12 mx-auto text-ocean-500 mb-2' />
            ),
            title: 'Articles & Resources',
            description:
                'Explore written studies, devotionals, and helpful tools for your faith journey.',
            buttonText: 'Read Articles',
            link: '/articles',
        },
    ];

    return (
        <section className='mt-16'>
            <h2 className='text-2xl font-bold text-navy-700 mb-6 text-center'>
                Browse by Category
            </h2>
            <div className='grid md:grid-cols-3 gap-6'>
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        className='border-2 border-navy-200 hover:border-ocean-400 transition-colors text-center flex flex-col justify-evenly'
                    >
                        <CardHeader>
                            {category.icon}
                            <CardTitle className='text-navy-700'>
                                {category.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-navy-600'>
                                {category.description}
                            </p>
                        </CardContent>
                        <Link
                            href={category.link}
                            alt={category.title}
                            target={category.tab ? '_blank' : ''}
                        >
                            <Button
                                variant='outline'
                                className='border-ocean-500 text-ocean-600 mx-4 my-2'
                            >
                                {category.buttonText}
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
    );
}
