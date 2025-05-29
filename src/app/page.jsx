'use client';

import MediaCTA from '@/components/media/MediaCTA';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAnchor, FaBookOpen, FaHeart, FaUsers } from 'react-icons/fa';
import { Button } from '../components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../components/ui/card';

export default function HomePage() {
    const router = useRouter();
    const { user } = useAuth();
    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <section className='relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-600 to-ocean-600 text-white py-20 px-4'>
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='relative max-w-4xl mx-auto text-center'>
                    <div className='mb-8'>
                        <FaAnchor className='w-16 h-16 mx-auto mb-4 wave-animation' />
                    </div>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
                        Storm to <span className='text-ocean-400'>Shore</span>
                    </h1>
                    <p className='text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto'>
                        Finding peace in God's presence through life's storms. A
                        Christ-centered discipleship offering prayer,
                        encouragement, and biblical truth.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link href={user ? '/prayer-submit' : '/register'}>
                            <Button
                                size='lg'
                                className='bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-3 text-lg'
                            >
                                {user ? 'Submit Prayer Request' : 'Join Us'}
                            </Button>
                        </Link>
                        <Link href='/prayer-wall'>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-white text-navy-700 hover:bg-navy-700 hover:text-white px-8 py-3 text-lg'
                            >
                                View Prayer Wall
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold text-navy-700 mb-4'>
                            Anchored in Faith
                        </h2>
                        <p className='text-xl text-navy-600 max-w-2xl mx-auto'>
                            Our discipleship provides a safe harbor for those
                            navigating life's challenges, offering prayer
                            support and biblical encouragement.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-3 gap-8'>
                        <Card
                            className='border-2 border-navy-100 hover:border-ocean-400 transition-colors'
                            onClick={() => router.push('/prayer-wall')}
                        >
                            <CardHeader className='text-center'>
                                <FaHeart className='w-6 h-6 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700'>
                                    Prayer Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600 text-center'>
                                    Submit your prayer requests and receive
                                    support from our caring community. Choose to
                                    share publicly or keep private.
                                </p>
                            </CardContent>
                        </Card>
                        <Card
                            className='border-2 border-navy-100 hover:border-ocean-400 transition-colors'
                            onClick={() => router.push('/contact')}
                        >
                            <CardHeader className='text-center'>
                                <FaUsers className='w-6 h-6 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700'>
                                    Community Care
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600 text-center'>
                                    Join a community that prays for one another
                                    and shares in both struggles and victories
                                    through Christ.
                                </p>
                            </CardContent>
                        </Card>

                        <Card
                            className='border-2 border-navy-100 hover:border-ocean-400 transition-colors'
                            onClick={() => router.push('/media')}
                        >
                            <CardHeader className='text-center'>
                                <FaBookOpen className='w-6 h-6 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700'>
                                    Biblical Truth
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600 text-center'>
                                    Access encouraging media content,
                                    devotionals, and biblical teachings to
                                    strengthen your faith journey.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <MediaCTA />

            {/* Scripture Section */}
            <section className='py-20 px-4 bg-navy-50'>
                <div className='max-w-4xl mx-auto text-center'>
                    <blockquote className='font-bible text-2xl md:text-3xl font-medium text-navy-700 mb-6 leading-relaxed'>
                        "He maketh the storm a calm, so that the waves thereof
                        are still. Then are they glad because they be quiet;"
                    </blockquote>
                    <cite className='text-xl text-ocean-600 font-semibold'>
                        — Psalm 107:29-30 (KJV)
                    </cite>
                </div>
            </section>

            {/* Call to Action */}
            <section className='py-20 px-4 bg-gradient-to-r from-ocean-500 to-navy-600 text-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-6'>
                        Ready to Find Your Shore?
                    </h2>
                    <p className='text-xl mb-8 opacity-90'>
                        Whether you're facing a storm or celebrating God's
                        goodness, we're here to pray with you and encourage your
                        faith.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link href={user ? '/prayer-submit' : '/register'}>
                            <Button
                                size='lg'
                                className='border-white bg-ocean-500 hover:bg-ocean-600 text-white px-8 py-3 text-lg'
                            >
                                {user ? 'Submit Prayer Request' : 'Join Us'}
                            </Button>
                        </Link>
                        <Link href='/contact'>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-white text-navy-700 hover:text-white hover:bg-navy-700 px-8 py-3 text-lg'
                            >
                                Contact Our Discipleship
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
