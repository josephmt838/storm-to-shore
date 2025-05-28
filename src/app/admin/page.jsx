'use client';

import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ContactMessagesTab } from '@/components/admin/ContactMessagesTab';
import { PrayerRequestsTab } from '@/components/admin/PrayerRequestsTab';
import { StatsCards } from '@/components/admin/StatsCards';
import { TabNavigation } from '@/components/admin/TabNavigation';
import { useToast } from '@/hooks/use-toast.jsx';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';

export default function Admin() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedTab, setSelectedTab] = useState('prayers');

    const { data: prayers = [], isLoading: prayersLoading } = useQuery({
        queryKey: ['/prayer'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'prayer');
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const { data: contacts = [], isLoading: contactsLoading } = useQuery({
        queryKey: ['/api/contact-messages'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'contact-messages');
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const response = await apiRequest('POST', `/prayer/${id}/status`, {
                status,
            });

            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['/prayer'] });
            toast({
                title: 'Status Updated',
                description:
                    'Prayer request status has been updated successfully.',
                variant: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to update prayer request status.',
                variant: 'destructive',
            });
        },
    });
    const respondeMessageMutation = useMutation({
        mutationFn: async ({ id }) => {
            const response = await apiRequest(
                'POST',
                `contact-message/${id}/responded`,
                {
                    id,
                },
            );

            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['/contact-messages'] });
            toast({
                title: 'Contact Message Updated',
                description: 'Contact message has been updated successfully.',
                variant: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description:
                    'Failed to update contact message reponded status.',
                variant: 'destructive',
            });
        },
    });

    const handleStatusUpdate = (id, status) => {
        updateStatusMutation.mutate({ id, status });
    };

    const handleRespondMessage = (id) => {
        respondeMessageMutation.mutate({ id });
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
                            Loading discipleship data...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AdminProtectedRoute>
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <AdminHeader />
                    <StatsCards
                        prayers={prayers}
                        contacts={contacts}
                    />
                    <TabNavigation
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {selectedTab === 'prayers' && (
                        <PrayerRequestsTab
                            prayers={prayers}
                            handleStatusUpdate={handleStatusUpdate}
                            updateStatusMutation={updateStatusMutation}
                        />
                    )}

                    {selectedTab === 'contacts' && (
                        <ContactMessagesTab
                            contacts={contacts}
                            respondeMessageMutation={respondeMessageMutation}
                            handleRespondMessage={handleRespondMessage}
                        />
                    )}
                </div>
            </div>
        </AdminProtectedRoute>
    );
}
