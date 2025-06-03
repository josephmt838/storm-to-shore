'use client';

import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import Link from 'next/link';

const AdminDashboard = () => {
    const adminSections = [
        {
            title: 'Moderate',
            description: 'Manage prayer requests and contact messages',
            href: '/admin/moderate',
            icon: '👥',
        },
        {
            title: 'Media',
            description: 'Manage media files and uploads',
            href: '/admin/media',
            icon: '📁',
        },
        {
            title: 'Articles',
            description: 'Manage articles and blog posts',
            href: '/admin/articles',
            icon: '📝',
        },
    ];

    return (
        <AdminProtectedRoute>
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <AdminHeader
                        headline='Manage Admin process for Storm to Shore
                Displeship'
                    />

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {adminSections.map((section) => (
                            <Link
                                key={section.title}
                                href={section.href}
                                className='block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
                            >
                                <div className='flex items-center space-x-4'>
                                    <span className='text-4xl'>
                                        {section.icon}
                                    </span>
                                    <div>
                                        <h2 className='text-xl font-semibold text-gray-900'>
                                            {section.title}
                                        </h2>
                                        <p className='text-gray-600 mt-1'>
                                            {section.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminProtectedRoute>
    );
};

export default AdminDashboard;
