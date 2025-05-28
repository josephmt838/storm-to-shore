import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFileAlt, FaMusic, FaVideo } from 'react-icons/fa';

export default function CategorySection() {
    const categories = [
        {
            icon: <FaVideo className='w-12 h-12 mx-auto text-ocean-500 mb-2' />,
            title: 'Sermons & Messages',
            description: 'Biblical teachings and inspiring messages for spiritual growth.',
            buttonText: 'Browse Sermons'
        },
        {
            icon: <FaMusic className='w-12 h-12 mx-auto text-ocean-500 mb-2' />,
            title: 'Worship & Devotionals',
            description: 'Peaceful worship music and daily devotional content.',
            buttonText: 'Browse Worship'
        },
        {
            icon: <FaFileAlt className='w-12 h-12 mx-auto text-ocean-500 mb-2' />,
            title: 'Articles & Resources',
            description: 'Written resources and biblical insights for deeper study.',
            buttonText: 'Browse Articles'
        }
    ];

    return (
        <section className='mt-16'>
            <h2 className='text-2xl font-bold text-navy-700 mb-6 text-center'>
                Browse by Category
            </h2>
            <div className='grid md:grid-cols-3 gap-6'>
                {categories.map((category, index) => (
                    <Card key={index} className='border-2 border-navy-200 hover:border-ocean-400 transition-colors text-center'>
                        <CardHeader>
                            {category.icon}
                            <CardTitle className='text-navy-700'>
                                {category.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-navy-600 mb-4'>
                                {category.description}
                            </p>
                            <Button
                                variant='outline'
                                className='border-ocean-500 text-ocean-600'
                            >
                                {category.buttonText}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
} 