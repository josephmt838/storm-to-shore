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
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
    code: z.string().min(6, 'Code must be 6 characters'),
});

export default function Confirm() {
    const { toast } = useToast();
    const { confirmSignUp, resendConfirmationCode } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

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
                description: 'Your email has been verified successfully. You can now log in.',
                variant: 'success',
            });
            window.location.href = '/login';
        } catch (error) {
            toast({
                title: 'Verification Failed',
                description: error.message || 'Failed to verify email. Please try again.',
                variant: 'destructive',
            });
        }
    };

    const handleResendCode = async () => {
        try {
            await resendConfirmationCode(email);
            toast({
                title: 'Code Resent',
                description: 'A new verification code has been sent to your email.',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to resend verification code.',
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
                                    This confirmation link is invalid or has expired.
                                </p>
                                <Button
                                    onClick={() => window.location.href = '/login'}
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
                <div className='text-center mb-8'>
                    <FaCheckCircle className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Verify Your Email
                    </h1>
                    <p className='text-lg text-navy-600'>
                        Please enter the verification code sent to your email
                    </p>
                </div>

                <Card className='border-2 border-navy-200 shadow-lg'>
                    <CardHeader className='bg-gradient-to-r from-ocean-500 to-navy-600 text-white rounded-t-lg'>
                        <CardTitle className='text-center text-xl'>
                            Verification Code
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
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Verification Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Enter 6-digit code'
                                                    className='border-navy-200 focus:border-ocean-500'
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
                                >
                                    Verify Email
                                </Button>
                            </form>
                        </Form>

                        <div className='mt-6 text-center'>
                            <p className='text-navy-600'>
                                Didn't receive the code?{' '}
                                <Button
                                    onClick={handleResendCode}
                                    variant='link'
                                    className='text-ocean-500 hover:text-ocean-600 font-semibold p-0'
                                >
                                    Resend Code
                                </Button>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 