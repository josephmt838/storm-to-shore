'use client';

import MediaCard from '@/components/admin/media/MediaCard';
import MediaForm from '@/components/admin/media/MediaForm';
import NoMedia from '@/components/admin/media/NoMedia';
import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';
import { LoadingIcon } from '@/components/ui/loading-icon';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

const Media = () => {
    const { toast } = useToast();

    // Fetch media items
    const { data: mediaItems = [], isLoading } = useQuery({
        queryKey: ['/media'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'media');
            return response.json();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to fetch media items. Please try again.',
                variant: 'destructive',
            });
        },
    });

    return (
        <AdminProtectedRoute>
            <div className='container mx-auto py-8 min-h-[700px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Media Management</h1>
                    <MediaForm />
                </div>

                <div className='h-[500px] content-center'>
                    {isLoading ? (
                        <div className='w-full flex justify-center'>
                            <LoadingIcon size='xl' />
                        </div>
                    ) : mediaItems.length === 0 ? (
                        <NoMedia />
                    ) : (
                        <div className='grid gap-4'>
                            {mediaItems.map((media) => (
                                <MediaCard
                                    key={media.id}
                                    media={media}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminProtectedRoute>
    );
};

export default Media;
