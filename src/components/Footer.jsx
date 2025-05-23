import Link from 'next/link';
import {
    FaAnchor,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaPrayingHands,
    FaYoutube,
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='bg-navy-900 text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid md:grid-cols-3 gap-8 text-white'>
                    {/* Logo and Mission */}
                    <div className='md:col-span-2'>
                        <div className='flex items-center space-x-3 mb-4'>
                            <div className='w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center'>
                                <FaAnchor
                                    className='text-white text-lg'
                                    size={20}
                                />
                            </div>
                            <span className='text-xl font-semibold'>
                                Storm to Shore
                            </span>
                        </div>
                        <p className='mb-6 max-w-md'>
                            A Christ-centered ministry helping people navigate
                            life's storms and find peace in God's presence.
                        </p>
                        <div className='flex space-x-4'>
                            <Link
                                href='https://www.facebook.com/profile.php?id=61576837583145'
                                target='_blank'
                                className='text-white hover:text-ocean-400 transition-colors'
                            >
                                <FaFacebook size={20} />
                            </Link>
                            <Link
                                href='https://www.youtube.com/@StormToShoreDiscipleship'
                                target='_blank'
                                className='text-white hover:text-ocean-400 transition-colors'
                            >
                                <FaYoutube size={20} />
                            </Link>
                            <Link
                                href='https://www.instagram.com/stormtoshore/'
                                target='_blank'
                                className='text-white hover:text-ocean-400 transition-colors'
                            >
                                <FaInstagram size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            Quick Links
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/'
                                    className='hover:text-ocean-400 transition-colors'
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/prayer/wall'
                                    className='hover:text-ocean-400 transition-colors'
                                >
                                    Prayer Wall
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/about'
                                    className='hover:text-ocean-400 transition-colors'
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/media'
                                    className='hover:text-ocean-400 transition-colors'
                                >
                                    Media
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='hover:text-ocean-400 transition-colors'
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className='text-lg font-semibold mb-4'>
                            Get in Touch
                        </h3>
                        <div className='space-y-3'>
                            <div className='flex items-center space-x-3'>
                                <FaEnvelope
                                    className='text-ocean-400'
                                    size={16}
                                />
                                <span>
                                    <Link href='mailto:storm-to-shore@josephmt.com'>
                                        storm-to-shore@josephmt.com
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-t border-navy-800 mt-8 pt-8 text-center'>
                    <p className='text-navy-400'>
                        &copy; 2025 Storm to Shore Discipleship. All rights
                        reserved.
                    </p>
                    <div className='text-navy-400 flex justify-center items-center gap-2'>
                        <p>Created with</p>
                        <FaPrayingHands className='' />
                        <Link
                            href='https://www.josephmt.com'
                            className='hover:cursor-pointer hover:text-ocean-500'
                        >
                            JosephMT.com
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
