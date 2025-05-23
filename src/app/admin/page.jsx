'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast.jsx';
import {
    getAllContactMessages,
    getAllPrayers,
    updatePrayerStatus,
} from '@/lib/mockData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
    FaClock,
    FaEye,
    FaEyeSlash,
    FaHeart,
    FaShieldAlt,
} from 'react-icons/fa';

export default function Admin() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedTab, setSelectedTab] = useState('prayers');

    const { data: prayers = [], isLoading: prayersLoading } = useQuery({
        queryKey: ['/api/prayers'],
        queryFn: () => getAllPrayers(),
    });

    const { data: contacts = [], isLoading: contactsLoading } = useQuery({
        queryKey: ['/api/contacts'],
        queryFn: () => getAllContactMessages(),
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            updatePrayerStatus(id, status);
            return { id, status };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/prayers'] });
            toast({
                title: 'Status Updated',
                description:
                    'Prayer request status has been updated successfully.',
            });
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to update prayer request status.',
                variant: 'destructive',
            });
        },
    });

    const handleStatusUpdate = (id, status) => {
        updateStatusMutation.mutate({ id, status });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (prayersLoading || contactsLoading) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center'>
                        <FaShieldAlt className='w-12 h-12 mx-auto text-ocean-500 mb-4 animate-pulse' />
                        <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                            Admin Dashboard
                        </h1>
                        <p className='text-lg text-navy-600'>
                            Loading ministry data...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <FaShieldAlt className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Ministry Admin Dashboard
                    </h1>
                    <p className='text-lg text-navy-600'>
                        Manage prayer requests and contact messages for Storm to
                        Shore Ministry
                    </p>
                </div>

                {/* Stats Cards */}
                <div className='grid md:grid-cols-4 gap-6 mb-8'>
                    <Card className='border-2 border-navy-200'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-sm text-navy-600'>
                                Total Prayer Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex items-center gap-2'>
                                <FaHeart className='w-6 h-6 text-ocean-500' />
                                <span className='text-2xl font-bold text-navy-700'>
                                    {prayers.length}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-2 border-navy-200'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-sm text-navy-600'>
                                Pending Review
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex items-center gap-2'>
                                <FaClock className='w-6 h-6 text-ocean-500' />
                                <span className='text-2xl font-bold text-navy-700'>
                                    {
                                        prayers.filter(
                                            (p) => p.status === 'pending',
                                        ).length
                                    }
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-2 border-navy-200'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-sm text-navy-600'>
                                Approved
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex items-center gap-2'>
                                <FaCheck className='w-6 h-6 text-green-500' />
                                <span className='text-2xl font-bold text-navy-700'>
                                    {
                                        prayers.filter(
                                            (p) => p.status === 'approved',
                                        ).length
                                    }
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-2 border-navy-200'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-sm text-navy-600'>
                                Contact Messages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex items-center gap-2'>
                                <FaMessageSquare className='w-6 h-6 text-ocean-500' />
                                <span className='text-2xl font-bold text-navy-700'>
                                    {contacts.length}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tab Navigation */}
                <div className='flex space-x-1 mb-8 bg-white p-1 rounded-lg border-2 border-navy-200'>
                    <Button
                        variant={
                            selectedTab === 'prayers' ? 'default' : 'ghost'
                        }
                        onClick={() => setSelectedTab('prayers')}
                        className={
                            selectedTab === 'prayers'
                                ? 'bg-ocean-500 text-white'
                                : 'text-navy-600'
                        }
                    >
                        <FaHeart className='w-4 h-4 mr-2' />
                        Prayer Requests
                    </Button>
                    <Button
                        variant={
                            selectedTab === 'contacts' ? 'default' : 'ghost'
                        }
                        onClick={() => setSelectedTab('contacts')}
                        className={
                            selectedTab === 'contacts'
                                ? 'bg-ocean-500 text-white'
                                : 'text-navy-600'
                        }
                    >
                        <FaMail className='w-4 h-4 mr-2' />
                        Contact Messages
                    </Button>
                </div>

                {/* Prayer Requests Tab */}
                {selectedTab === 'prayers' && (
                    <div className='space-y-6'>
                        {prayers.length === 0 ? (
                            <Card className='border-2 border-navy-200 text-center py-12'>
                                <CardContent>
                                    <FaHeart className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                                    <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                                        No Prayer Requests
                                    </h3>
                                    <p className='text-navy-500'>
                                        Prayer requests will appear here for
                                        review and approval.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            prayers.map((prayer) => (
                                <Card
                                    key={prayer.id}
                                    className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'
                                >
                                    <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <CardTitle className='text-navy-700 text-lg mb-2 flex items-center gap-2'>
                                                    {prayer.title ||
                                                        'Prayer Request'}
                                                    {prayer.isPublic ? (
                                                        <FaEye
                                                            className='w-4 h-4 text-ocean-500'
                                                            title='Public'
                                                        />
                                                    ) : (
                                                        <FaEyeSlash
                                                            className='w-4 h-4 text-navy-400'
                                                            title='Private'
                                                        />
                                                    )}
                                                </CardTitle>
                                                <div className='flex items-center gap-4 text-sm text-navy-600'>
                                                    <span>
                                                        From: {prayer.name}
                                                    </span>
                                                    <span>
                                                        Email: {prayer.email}
                                                    </span>
                                                    <span>
                                                        Date:{' '}
                                                        {new Date(
                                                            prayer.createdAt,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                    {prayer.needsFollowUp && (
                                                        <Badge
                                                            variant='outline'
                                                            className='text-ocean-600 border-ocean-300'
                                                        >
                                                            Follow-up Requested
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge
                                                className={getStatusColor(
                                                    prayer.status,
                                                )}
                                            >
                                                {prayer.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='p-6'>
                                        <div className='mb-4'>
                                            <h4 className='font-semibold text-navy-700 mb-2'>
                                                Prayer Request:
                                            </h4>
                                            <p className='text-navy-600 whitespace-pre-wrap leading-relaxed'>
                                                {prayer.content}
                                            </p>
                                        </div>

                                        {prayer.status === 'pending' && (
                                            <div className='flex gap-3 pt-4 border-t border-navy-200'>
                                                <Button
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            prayer.id,
                                                            'approved',
                                                        )
                                                    }
                                                    disabled={
                                                        updateStatusMutation.isPending
                                                    }
                                                    className='bg-green-600 hover:bg-green-700 text-white'
                                                >
                                                    <FaCheck className='w-4 h-4 mr-2' />
                                                    Approve
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            prayer.id,
                                                            'rejected',
                                                        )
                                                    }
                                                    disabled={
                                                        updateStatusMutation.isPending
                                                    }
                                                    variant='destructive'
                                                >
                                                    <FaTimes className='w-4 h-4 mr-2' />
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {/* Contact Messages Tab */}
                {selectedTab === 'contacts' && (
                    <div className='space-y-6'>
                        {contacts.length === 0 ? (
                            <Card className='border-2 border-navy-200 text-center py-12'>
                                <CardContent>
                                    <FaMail className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                                    <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                                        No Contact Messages
                                    </h3>
                                    <p className='text-navy-500'>
                                        Contact messages from your ministry
                                        website will appear here.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            contacts.map((contact) => (
                                <Card
                                    key={contact.id}
                                    className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'
                                >
                                    <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <CardTitle className='text-navy-700 text-lg mb-2'>
                                                    Message from {contact.name}
                                                </CardTitle>
                                                <div className='flex items-center gap-4 text-sm text-navy-600'>
                                                    <span>
                                                        Email: {contact.email}
                                                    </span>
                                                    <span>
                                                        Date:{' '}
                                                        {new Date(
                                                            contact.createdAt,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge className='bg-blue-100 text-blue-800 border-blue-200'>
                                                Contact
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='p-6'>
                                        <div className='mb-4'>
                                            <h4 className='font-semibold text-navy-700 mb-2'>
                                                Message:
                                            </h4>
                                            <p className='text-navy-600 whitespace-pre-wrap leading-relaxed'>
                                                {contact.message}
                                            </p>
                                        </div>
                                        <div className='pt-4 border-t border-navy-200'>
                                            <Button
                                                className='bg-ocean-500 hover:bg-ocean-600 text-white'
                                                onClick={() =>
                                                    window.open(
                                                        `mailto:${contact.email}?subject=Re: Your message to Storm to Shore Ministry`,
                                                    )
                                                }
                                            >
                                                <FaMail className='w-4 h-4 mr-2' />
                                                Reply to {contact.name}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
