'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const MediaForm = ({ media, onSuccess }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: media || {
            title: '',
            description: '',
            type: 'video',
            category: '',
            duration: '',
            featured: false,
            thumbnail: '',
            date: new Date().toISOString().split('T')[0],
        },
    });

    // Create media mutation
    const createMediaMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest('POST', 'media', data);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/media'] });
            toast({
                title: 'Media Created',
                description: 'The media item has been created successfully.',
                variant: 'success',
            });
            form.reset();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to create media item. Please try again.',
                variant: 'destructive',
            });
        },
    });

    // Update media mutation
    const updateMediaMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await apiRequest('PUT', `media/${id}`, data);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/media'] });
            toast({
                title: 'Media Updated',
                description: 'The media item has been updated successfully.',
                variant: 'success',
            });
            form.reset();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to update media item. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data) => {
        if (data.id) {
            updateMediaMutation.mutate({ id: data.id, data });
        } else {
            createMediaMutation.mutate(data);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FaPlus className='mr-2' />
                    {media ? 'Edit Media' : 'New Media'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {media ? 'Edit Media' : 'New Media'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select media type' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='video'>
                                                Video
                                            </SelectItem>
                                            <SelectItem value='audio'>
                                                Audio
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='duration'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='e.g., 28 min'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='date'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='date'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='thumbnail'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='e.g., /api/placeholder/400/225'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='featured'
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Featured Media</FormLabel>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >
                            {media ? 'Update Media' : 'Create Media'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default MediaForm;
