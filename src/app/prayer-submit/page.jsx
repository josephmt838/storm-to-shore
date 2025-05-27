'use client';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast.jsx';
import { addPrayerRequest } from '@/lib/mockData';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaHeart, FaPaperPlane } from 'react-icons/fa';

export default function PrayerSubmit() {
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            title: '',
            content: '',
            isPublic: 'false',
            requestFollowUp: false,
        },
    });

    const submitPrayerMutation = useMutation({
        mutationFn: async (data) => {
            // Simulate API call with mock data
            const newRequest = {
                ...data,
                isPublic: data.isPublic === 'true',
            };
            addPrayerRequest(newRequest);
            return newRequest;
        },
        onSuccess: () => {
            toast({
                title: 'Prayer Request Submitted',
                description:
                    'Thank you for sharing your prayer request. Our community will be praying for you.',
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
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-2xl mx-auto'>
                <div className='text-center mb-8'>
                    <FaHeart className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Submit Prayer Request
                    </h1>
                    <p className='text-lg text-navy-600'>
                        Share your prayer request with our caring community. We
                        believe in the power of prayer and are honored to pray
                        alongside you.
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
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Your Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter your name'
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
                                                    placeholder='Share your prayer request in detail. We will treat your request with care and confidentiality.'
                                                    className='min-h-[120px] border-navy-200 focus:border-ocean-500'
                                                    {...field}
                                                />
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
                                                Privacy Setting
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className='mt-2'
                                                >
                                                    <div className='flex items-center space-x-2'>
                                                        <RadioGroupItem
                                                            value='false'
                                                            id='private'
                                                        />
                                                        <Label
                                                            htmlFor='private'
                                                            className='text-navy-600'
                                                        >
                                                            Private - Only our
                                                            prayer team will see
                                                            this request
                                                        </Label>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <RadioGroupItem
                                                            value='true'
                                                            id='public'
                                                        />
                                                        <Label
                                                            htmlFor='public'
                                                            className='text-navy-600'
                                                        >
                                                            Public - Share on
                                                            our prayer wall for
                                                            community prayer
                                                        </Label>
                                                    </div>
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
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Request Personal Follow-up
                                                </FormLabel>
                                                <p className='text-sm text-navy-600'>
                                                    Check this if you'd like
                                                    someone from our
                                                    discipleship team to reach
                                                    out to you personally.
                                                </p>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type='submit'
                                    className='w-full bg-ocean-500 hover:bg-ocean-600 text-white py-3 text-lg'
                                    disabled={submitPrayerMutation.isPending}
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
                        "Be careful for nothing; but in every thing by prayer
                        and supplication with thanksgiving let your requests be
                        made known unto God. And the peace of God, which passeth
                        all understanding, shall keep your hearts and minds
                        through Christ Jesus."
                    </p>
                    <p className='text-navy-600 italic'>- Philippians 4:6-7</p>
                </div>
            </div>
        </div>
    );
}
