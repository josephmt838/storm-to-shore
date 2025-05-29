'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast.jsx';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaHeart, FaPaperPlane } from 'react-icons/fa';

export default function PrayerSubmit() {
    const { toast } = useToast();
    const { user } = useAuth();

    const form = useForm({
        defaultValues: {
            title: '',
            content: '',
            isPublic: false,
            requestFollowUp: false,
            showName: 'true', // true = show name, false = anonymous
        },
    });

    const submitPrayerMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest('POST', 'prayer', {
                ...data,
                name: data.showName === 'true' ? user.name : 'Anonymous',
                email: user.email,
                isPublic: data.isPublic === 'true',
                requestFollowUp: data.requestFollowUp === 'true',
            });
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: 'Prayer Request Submitted',
                description:
                    'Thank you for sharing your prayer request. Our community will be praying for you.',
                variant: 'success',
            });
            form.reset();
        },
        onError: () => {
            toast({
                title: 'Error',
                description:
                    'There was an error submitting your prayer request. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (data) => {
        submitPrayerMutation.mutate(data);
    };

    return (
        <ProtectedRoute>
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-2xl mx-auto'>
                    <div className='text-center mb-8'>
                        <FaHeart className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                        <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                            Submit Prayer Request
                        </h1>
                        <p className='text-lg text-navy-600'>
                            Share your prayer request with our caring community.
                            We believe in the power of prayer and are honored to
                            pray alongside you.
                        </p>
                    </div>

                    <Card className='border-2 border-navy-200 shadow-lg'>
                        <CardHeader className='bg-gradient-to-r from-ocean-500 to-navy-600 text-white rounded-t-lg'>
                            <CardTitle className='text-center text-xl'>
                                Prayer Request Form
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
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Prayer Request Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Brief title for your prayer request'
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
                                        name='content'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Prayer Request Details
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder='Share the details of your prayer request...'
                                                        className='min-h-[150px] border-navy-200 focus:border-ocean-500'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='showName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Name Visibility
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className='flex flex-col space-y-1'
                                                    >
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='true' />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>
                                                                Show my name (
                                                                {user.name})
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='false' />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>
                                                                Submit
                                                                anonymously
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='isPublic'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Prayer Request Visibility
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className='flex flex-col space-y-1'
                                                    >
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='true' />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>
                                                                Public (Share on
                                                                Prayer Wall)
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value='false' />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>
                                                                Private (Only
                                                                visible to
                                                                prayer team)
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='requestFollowUp'
                                        render={({ field }) => (
                                            <FormItem className='flex items-center space-x-2'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className='text-navy-600'>
                                                    I would like someone to
                                                    follow up with me about this
                                                    prayer request
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type='submit'
                                        className='w-full bg-ocean-500 hover:bg-ocean-600 text-white py-3 text-lg'
                                        disabled={
                                            submitPrayerMutation.isPending
                                        }
                                    >
                                        {submitPrayerMutation.isPending ? (
                                            'Submitting...'
                                        ) : (
                                            <>
                                                <FaPaperPlane className='w-5 h-5 mr-2' />
                                                Submit Prayer Request
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    <div className='mt-8 text-center'>
                        <p className='text-navy-600 font-bold italic'>
                            "Be careful for nothing; but in every thing by
                            prayer and supplication with thanksgiving let your
                            requests be made known unto God. And the peace of
                            God, which passeth all understanding, shall keep
                            your hearts and minds through Christ Jesus."
                        </p>
                        <p className='text-navy-600 italic'>
                            - Philippians 4:6-7
                        </p>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
