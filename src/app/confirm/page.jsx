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
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    code: z.string().min(6, 'Code must be 6 characters'),
});

function ConfirmForm() {
    const { toast } = useToast();
    const { confirmSignUp, resendConfirmationCode } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            await confirmSignUp(email, data.code);
            toast({
                title: 'Email Verified',
                description:
                    'Your email has been verified successfully. You can now log in.',
                variant: 'success',
            });

            router.push('/login');
        } catch (error) {
            toast({
                title: 'Verification Failed',
                description:
                    error.message ||
                    'Failed to verify email. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleResendCode = async () => {
        try {
            await resendConfirmationCode(email);
            toast({
                title: 'Code Resent',
                description:
                    'A new verification code has been sent to your email.',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.message || 'Failed to resend verification code.',
                variant: 'destructive',
            });
        }
    };

    if (!email) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-md mx-auto'>
                    <Card className='border-2 border-navy-200 shadow-lg'>
                        <CardContent className='p-8'>
                            <div className='text-center'>
                                <h1 className='text-2xl font-bold text-navy-700 mb-4'>
                                    Invalid Confirmation Link
                                </h1>
                                <p className='text-navy-600 mb-4'>
                                    This confirmation link is invalid or has
                                    expired.
                                </p>
                                <Button
                                    onClick={() => router.push('/login')}
                                    className='bg-ocean-500 hover:bg-ocean-600 text-white'
                                >
                                    Return to Login
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-md mx-auto'>
                <Card className='border-2 border-navy-200 shadow-lg'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-bold text-navy-700 text-center'>
                            Confirm Your Email
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
                                    name='code'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Verification Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter 6-digit code'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex flex-col space-y-4'>
                                    <Button
                                        type='submit'
                                        className='bg-ocean-500 hover:bg-ocean-600 text-white'
                                    >
                                        Verify Email
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={handleResendCode}
                                    >
                                        Resend Code
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function Confirm() {
    return (
        <Suspense
            fallback={
                <div className='min-h-screen bg-navy-50 flex items-center justify-center'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-500 mx-auto'></div>
                        <p className='mt-4 text-navy-700'>Loading...</p>
                    </div>
                </div>
            }
        >
            <ConfirmForm />
        </Suspense>
    );
}
