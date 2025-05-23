'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
    FaAnchor,
    FaBookOpen,
    FaCross,
    FaHeart,
    FaUsers,
    FaWater,
} from 'react-icons/fa';

export default function About() {
    return (
        <div className='min-h-screen bg-navy-50'>
            {/* Hero Section */}
            <section className='relative bg-gradient-to-br from-navy-700 via-navy-600 to-ocean-600 text-white py-20 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <FaAnchor className='w-16 h-16 mx-auto mb-6 wave-animation' />
                    <h1 className='text-5xl font-bold mb-6'>
                        About Storm to Shore
                    </h1>
                    <p className='text-xl opacity-90 leading-relaxed max-w-3xl mx-auto'>
                        A Christ-centered ministry dedicated to helping people
                        navigate life's storms and find their anchor in Jesus
                        Christ.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className='py-16 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-4xl font-bold text-navy-700 mb-6'>
                            Our Mission
                        </h2>
                        <p className='text-xl text-navy-600 leading-relaxed'>
                            We believe that no one should face life's storms
                            alone. Through the power of prayer, biblical
                            encouragement, and Christian community, we help
                            people find hope and healing in Jesus Christ.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 gap-8'>
                        <Card className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'>
                            <CardHeader className='text-center'>
                                <FaCross className='w-12 h-12 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700 text-xl'>
                                    Christ-Centered Foundation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600'>
                                    Everything we do is rooted in God's Word and
                                    centered on the Gospel of Jesus Christ. We
                                    believe that true peace and healing come
                                    through a relationship with our Savior.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'>
                            <CardHeader className='text-center'>
                                <FaHeart className='w-12 h-12 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700 text-xl'>
                                    Compassionate Care
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600'>
                                    We approach every prayer request and person
                                    with genuine love, compassion, and respect.
                                    Your struggles matter to us because they
                                    matter to God.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'>
                            <CardHeader className='text-center'>
                                <FaUsers className='w-12 h-12 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700 text-xl'>
                                    Community Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600'>
                                    We foster a caring community where believers
                                    can support one another through prayer,
                                    encouragement, and practical help during
                                    difficult seasons.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'>
                            <CardHeader className='text-center'>
                                <FaBookOpen className='w-12 h-12 text-ocean-500 mb-4 mx-auto' />
                                <CardTitle className='text-navy-700 text-xl'>
                                    Biblical Truth
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className='text-navy-600'>
                                    We share God's Word as our source of hope,
                                    wisdom, and guidance for navigating life's
                                    challenges and growing in faith.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className='py-16 px-4 bg-white'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <FaWater className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                        <h2 className='text-4xl font-bold text-navy-700 mb-6'>
                            Our Story
                        </h2>
                    </div>

                    <div className='prose prose-lg mx-auto text-navy-600'>
                        <p className='text-xl leading-relaxed mb-6'>
                            The name "Storm to Shore" comes from the biblical
                            imagery of God as our refuge and anchor in life's
                            storms. Just as sailors look to the shore for safety
                            and direction, we help people fix their eyes on
                            Jesus - our eternal shore and safe harbor.
                        </p>

                        <blockquote className='font-bible text-2xl font-medium text-center text-navy-700 my-8 p-6 bg-ocean-50 border-l-4 border-ocean-500 rounded-r-lg'>
                            "For thou hast been a strength to the poor, a
                            strength to the needy in his distress, a refuge from
                            the storm, a shadow from the heat, when the blast of
                            the terrible ones is as a storm against the wall."
                            <cite className='block text-lg text-ocean-600 mt-4'>
                                — Isaiah 25:4 (KJV)
                            </cite>
                        </blockquote>

                        <p className='text-lg leading-relaxed mb-6'>
                            This ministry was born out of a deep conviction that
                            prayer changes everything and that no one should
                            walk through life's difficulties alone. We've
                            experienced firsthand how God uses His people to
                            bring comfort, hope, and healing to those who are
                            hurting.
                        </p>

                        <p className='text-lg leading-relaxed'>
                            Whether you're facing a season of uncertainty,
                            struggling with health challenges, dealing with
                            relationship difficulties, or simply need
                            encouragement in your faith journey, we're here to
                            pray with you and point you toward the hope found in
                            Christ.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className='py-16 px-4 bg-navy-50'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-4xl font-bold text-navy-700 mb-6'>
                            Our Values
                        </h2>
                        <p className='text-xl text-navy-600'>
                            These core values guide everything we do as a
                            ministry community.
                        </p>
                    </div>

                    <div className='space-y-8'>
                        <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                            <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                                Confidentiality
                            </h3>
                            <p className='text-navy-600 text-lg'>
                                We treat every prayer request with the utmost
                                confidentiality and respect. Private requests
                                remain private, and we never share personal
                                information without permission.
                            </p>
                        </div>

                        <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                            <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                                Authenticity
                            </h3>
                            <p className='text-navy-600 text-lg'>
                                We believe in being real about life's struggles
                                and God's goodness. Our ministry is a safe space
                                to share honestly and receive genuine care.
                            </p>
                        </div>

                        <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                            <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                                Hope
                            </h3>
                            <p className='text-navy-600 text-lg'>
                                Even in the darkest storms, we hold fast to the
                                hope we have in Jesus Christ. We aim to be
                                bearers of that hope to everyone we encounter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className='py-16 px-4 bg-gradient-to-r from-ocean-500 to-navy-600 text-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-4xl font-bold mb-6'>
                        Join Our Community
                    </h2>
                    <p className='text-xl mb-8 opacity-90'>
                        Whether you need prayer or want to pray for others, we
                        invite you to be part of our caring community.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Link href='/prayer-submit'>
                            <Button
                                size='lg'
                                className='px-8 py-3 text-lg'
                            >
                                Submit a Prayer Request
                            </Button>
                        </Link>
                        <Link href='/prayer-wall'>
                            <Button
                                size='lg'
                                variant='outline'
                                className='border-white bg-navy-800 hover:bg-white hover:text-navy-700 px-8 py-3 text-lg'
                            >
                                Pray for Others
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
