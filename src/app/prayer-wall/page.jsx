'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingIcon } from '@/components/ui/loading-icon';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCalendar, FaHeart, FaUsers } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { PiHandsPraying } from 'react-icons/pi';

export default function PrayerWall() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Query for public prayers
    const { data: prayers = [], isLoading } = useQuery({
        queryKey: ['prayer/public'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'prayer/public');
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    // Query for user's prayed prayers
    const { data: prayedPrayers = [] } = useQuery({
        queryKey: ['prayer/prayed', user?.id],
        queryFn: async () => {
            if (!user?.id) {
                return [];
            }
            try {
                const response = await apiRequest(
                    'GET',
                    `prayer/prayed?userId=${user.id}`,
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch prayed prayers');
                }
                return response.json();
            } catch (error) {
                console.error('Error fetching prayed prayers:', error);
                throw error;
            }
        },
        enabled: !!user?.id && prayers.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });

    // Mutation for praying
    const prayMutation = useMutation({
        mutationFn: async (prayerId) => {
            const response = await apiRequest('POST', 'prayer/prayed', {
                userId: user.id,
                prayerId: prayerId,
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['prayer/public']);
            queryClient.invalidateQueries(['prayer/prayed', user?.id]);
            toast({
                title: 'Success',
                description: 'Thank you for praying!',
                variant: 'success',
            });
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to record your prayer',
                variant: 'destructive',
            });
        },
    });

    const handlePrayerCount = (prayer) => {
        if (!user) {
            toast({
                title: 'Authentication Required',
                description: 'Please log in to pray for this request',
                variant: 'destructive',
            });
            return;
        }

        if (prayedPrayers.some((p) => p.id === prayer.id)) {
            toast({
                title: 'Already Prayed',
                description: 'You have already prayed for this request',
                variant: 'default',
            });
            return;
        }

        prayMutation.mutate(prayer.id);
    };

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-8'>
                    <FaUsers className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Community Prayer Wall
                    </h1>
                    <p className='text-lg text-navy-600 max-w-2xl mx-auto'>
                        Join our community in prayer. These are public prayer
                        requests from fellow believers who have chosen to share
                        their needs with our church family.
                    </p>
                </div>
                {isLoading ? (
                    <div className='w-full flex justify-center'>
                        <LoadingIcon size='xl' />
                    </div>
                ) : (
                    <>
                        {prayers.length === 0 ? (
                            <Card className='border-2 border-navy-200 text-center py-12'>
                                <CardContent>
                                    <FaHeart className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                                    <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                                        No Public Prayer Requests Yet
                                    </h3>
                                    <p className='text-navy-500'>
                                        Be the first to share a public prayer
                                        request with our community.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className='space-y-6'>
                                {prayers.map((prayer) => (
                                    <Card
                                        key={prayer.id}
                                        className='border-2 border-navy-200 hover:border-ocean-400 transition-colors shadow-md'
                                    >
                                        <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                                            <div className='flex items-start justify-between'>
                                                <div className='flex-1'>
                                                    <CardTitle className='text-navy-700 text-xl mb-2'>
                                                        {prayer.title ||
                                                            'Prayer Request'}
                                                    </CardTitle>
                                                    <div className='flex items-center gap-4 text-sm text-navy-600'>
                                                        <span className='flex items-center gap-2'>
                                                            <IoPerson className='w-6 h-6 text-ocean-500' />
                                                            {prayer.name ||
                                                                'Anonymous'}
                                                        </span>
                                                        <span className='flex items-center gap-2'>
                                                            <FaCalendar className='w-6 h-6 text-ocean-500' />
                                                            {new Date(
                                                                prayer.date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge className='bg-ocean-100 text-ocean-700 border-ocean-200'>
                                                    Praying
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='pb-6'>
                                            <p className='text-navy-600 leading-relaxed whitespace-pre-wrap mb-2'>
                                                {prayer.text}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handlePrayerCount(prayer)
                                                }
                                                disabled={prayedPrayers.some(
                                                    (p) => p.id === prayer.id,
                                                )}
                                                className={`text-sm flex gap-2 items-center ${
                                                    prayedPrayers.some(
                                                        (p) =>
                                                            p.id === prayer.id,
                                                    )
                                                        ? 'text-navy-400 cursor-not-allowed'
                                                        : 'text-ocean-700 hover:text-ocean-900 cursor-pointer'
                                                }`}
                                            >
                                                <PiHandsPraying />{' '}
                                                {prayer.count || 0}
                                            </button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className='mt-12 text-center'>
                    <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                        <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                            Praying Together
                        </h3>
                        <p className='font-bible text-navy-600 mb-4'>
                            "Again I say unto you, That if two of you shall
                            agree on earth as touching any thing that they shall
                            ask, it shall be done for them of my Father which is
                            in heaven. For where two or three are gathered
                            together in my name, there am I in the midst of
                            them."
                        </p>
                        <cite className='font-bible text-ocean-600 font-semibold'>
                            — Matthew 18:19-20 (KJV)
                        </cite>
                    </div>
                </div>
            </div>
        </div>
    );
}
