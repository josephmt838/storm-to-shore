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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

const ArticleForm = ({ article, onSuccess }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: article || {
            title: '',
            description: '',
            content: '',
            category: '',
            featured: false,
            duration: '',
        },
    });

    // Create article mutation
    const createArticleMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest('POST', 'articles', data);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/articles'] });
            toast({
                title: 'Article Created',
                description: 'The article has been created successfully.',
                variant: 'success',
            });
            form.reset();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to create article. Please try again.',
                variant: 'destructive',
            });
        },
    });

    // Update article mutation
    const updateArticleMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await apiRequest('PUT', `articles/${id}`, data);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/articles'] });
            toast({
                title: 'Article Updated',
                description: 'The article has been updated successfully.',
                variant: 'success',
            });
            form.reset();
            onSuccess?.();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to update article. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data) => {
        if (data.id) {
            updateArticleMutation.mutate({ id: data.id, data });
        } else {
            createArticleMutation.mutate(data);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FaPlus className='mr-2' />
                    {article ? 'Edit Article' : 'New Article'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {article ? 'Edit Article' : 'New Article'}
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
                            name='content'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className='min-h-[200px]'
                                        />
                                    </FormControl>
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
                                    <FormLabel>Reading Duration</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='e.g., 5 min read'
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
                                    <FormLabel>Featured Article</FormLabel>
                                </FormItem>
                            )}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >
                            {article ? 'Update Article' : 'Create Article'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleForm;
