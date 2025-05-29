'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function MediaCTA() {
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            email: '',
        },
    });

    const subscribeMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest('POST', 'subscribe', {
                email: data.email,
            });
            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: 'Successfully Subscribed!',
                description: 'Thank you for subscribing to our updates.',
                variant: 'success',
            });
            form.reset();
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to subscribe. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data) => {
        subscribeMutation.mutate(data);
    };

    return (
        <section className='mt-16 text-center'>
            <div className='bg-gradient-to-r from-ocean-600 to-navy-700 text-white p-8 rounded-lg shadow-lg'>
                <h3 className='text-2xl font-bold mb-4 text-white'>
                    Stay Connected with Our Latest Content
                </h3>
                <p className='text-lg text-gray-100 mb-6 leading-relaxed'>
                    Get notified when we publish new sermons, devotionals, and
                    encouraging resources.
                </p>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='max-w-md mx-auto'
                >
                    <div className='flex flex-col gap-2 sm:flex-row'>
                        <Input
                            type='email'
                            placeholder='Enter your email'
                            className='flex-1 text-navy-700'
                            {...form.register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <Button
                            type='submit'
                            size='lg'
                            disabled={subscribeMutation.isPending}
                        >
                            {subscribeMutation.isPending ? (
                                'Subscribing...'
                            ) : (
                                <>
                                    <FaExternalLinkAlt className='w-5 h-5 mr-2' />
                                    Subscribe
                                </>
                            )}
                        </Button>
                    </div>
                    {form.formState.errors.email && (
                        <p className='text-red-200 mt-2 text-sm'>
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
