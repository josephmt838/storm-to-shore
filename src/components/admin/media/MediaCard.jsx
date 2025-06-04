'use client';

import { getMediaIcon } from '@/components/media/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCalendar, FaClock, FaTrash } from 'react-icons/fa';
import MediaForm from './MediaForm';

const MediaCard = ({ media }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Delete media mutation
    const deleteMediaMutation = useMutation({
        mutationFn: async (id) => {
            const response = await apiRequest('DELETE', `media/${id}`);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/media'] });
            toast({
                title: 'Media Deleted',
                description: 'The media item has been deleted successfully.',
                variant: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to delete media item. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const handleDelete = (id) => {
        if (
            window.confirm('Are you sure you want to delete this media item?')
        ) {
            deleteMediaMutation.mutate(id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            {getMediaIcon(media.type)}
                            {media.title}
                        </CardTitle>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mt-1'>
                            <span className='flex items-center gap-1'>
                                <FaCalendar className='w-4 h-4' />
                                {new Date(media.date).toLocaleDateString()}
                            </span>
                            <span className='flex items-center gap-1'>
                                <FaClock className='w-4 h-4' />
                                {media.duration}
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <MediaForm media={media} />
                        <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => handleDelete(media.id)}
                        >
                            <FaTrash className='mr-2' />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-gray-600'>{media.description}</p>
            </CardContent>
        </Card>
    );
};

export default MediaCard;
