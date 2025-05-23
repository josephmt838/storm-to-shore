'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useToast } from '@/hooks/use-toast.jsx';
import { addContactMessage } from '@/lib/mockData';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaComments, FaMailBulk } from 'react-icons/fa';

export default function Contact() {
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const submitContactMutation = useMutation({
        mutationFn: async (data) => {
            // Simulate API call with mock data
            addContactMessage(data);
            return data;
        },
        onSuccess: () => {
            toast({
                title: 'Message Sent Successfully',
                description:
                    "Thank you for reaching out! We'll get back to you as soon as possible.",
            });
            form.reset();
        },
        onError: () => {
            toast({
                title: 'Error',
                description:
                    'There was an error sending your message. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data) => {
        submitContactMutation.mutate(data);
    };

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center mb-12'>
                    <FaComments className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Contact Our Ministry
                    </h1>
                    <p className='text-lg text-navy-600 max-w-2xl mx-auto'>
                        We'd love to hear from you! Whether you have questions,
                        need prayer, or want to learn more about our ministry,
                        please reach out.
                    </p>
                </div>

                <div className='grid lg:grid-cols-2 gap-12'>
                    {/* Contact Form */}
                    <Card className='border-2 border-navy-200 shadow-lg'>
                        <CardHeader className='bg-gradient-to-r from-ocean-500 to-navy-600 text-white rounded-t-lg'>
                            <CardTitle className='text-center text-xl'>
                                Send Us a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-8'>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-6'
                                >
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Your Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your full name'
                                                        className='border-navy-200 focus:border-ocean-500'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='your.email@example.com'
                                                        className='border-navy-200 focus:border-ocean-500'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='message'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Your Message
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder='Share your thoughts, questions, or prayer requests with us...'
                                                        className='min-h-[150px] border-navy-200 focus:border-ocean-500'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type='submit'
                                        className='w-full bg-ocean-500 hover:bg-ocean-600 text-white py-3 text-lg'
                                        disabled={
                                            submitContactMutation.isPending
                                        }
                                    >
                                        {submitContactMutation.isPending ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                <FaComments className='w-5 h-5 mr-2' />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className='space-y-8'>
                        <Card className='border-2 border-navy-200 shadow-lg'>
                            <CardHeader>
                                <CardTitle className='text-navy-700 text-xl'>
                                    Upcoming Events
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-3'>
                                    <div className='flex justify-between'>
                                        <span className='text-navy-600'>
                                            Live Bible Reading
                                        </span>
                                        <span className='text-navy-700 font-medium'>
                                            Tuesday 8:30 PM EST
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-navy-600'>
                                            YouTube Video Releases
                                        </span>
                                        <span className='text-navy-700 font-medium'>
                                            Monday/Thursday @8 PM EST
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-navy-600'>
                                            Email Response
                                        </span>
                                        <span className='text-navy-700 font-medium'>
                                            Within 48 hours
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='border-2 border-navy-200 shadow-lg'>
                            <CardHeader>
                                <CardTitle className='text-navy-700 text-xl flex items-center gap-2'>
                                    <FaComments className='w-6 h-6 text-ocean-500' />
                                    Get In Touch
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-6'>
                                <div className='flex items-start gap-4'>
                                    <FaMailBulk className='w-6 h-6 text-ocean-500 mt-1' />
                                    <div>
                                        <h3 className='font-semibold text-navy-700 mb-1'>
                                            Email
                                        </h3>
                                        <p className='text-navy-600'>
                                            Send us your questions or prayer
                                            requests
                                        </p>
                                        <p className='text-ocean-600 font-medium'>
                                            <Link href='mailto:hello@stormtoshore.org'>
                                                hello@stormtoshore.org
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card className='border-2 border-navy-200 shadow-lg text-center mt-8'>
                    <div className='bg-white p-8 rounded-lg border-2 border-navy-200 shadow-md'>
                        <h3 className='text-2xl font-bold text-navy-700 mb-4'>
                            We're Here for You
                        </h3>
                        <p className='text-navy-600 text-lg'>
                            "Cast all your anxiety on him because he cares for
                            you." - 1 Peter 5:7
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
