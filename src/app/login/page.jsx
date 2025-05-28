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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import * as z from 'zod';

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export default function Login() {
    const { toast } = useToast();
    const { signIn } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            console.log('Login result:', result);

            if (result.userNotConfirmed) {
                toast({
                    title: 'Account Not Confirmed',
                    description:
                        'Please confirm your email address before logging in.',
                    variant: 'destructive',
                });
                router.push(`/confirm?email=${encodeURIComponent(data.email)}`);
                return;
            }

            if (result.success) {
                router.push('/');
            } else {
                toast({
                    title: 'Login Failed',
                    description:
                        result.error || 'An error occurred during login',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.name === 'UserNotConfirmedException') {
                toast({
                    title: 'Account Not Confirmed',
                    description:
                        'Please confirm your email address before logging in.',
                    variant: 'destructive',
                });
                router.push(`/confirm?email=${encodeURIComponent(data.email)}`);
                return;
            }
            toast({
                title: 'Login Failed',
                description: error.message || 'An error occurred during login',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-md mx-auto'>
                <div className='text-center mb-8'>
                    <FaSignInAlt className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Welcome Back
                    </h1>
                    <p className='text-lg text-navy-600'>
                        Sign in to your account to continue
                    </p>
                </div>

                <Card className='border-2 border-navy-200 shadow-lg'>
                    <CardHeader className='bg-gradient-to-r from-ocean-500 to-navy-600 text-white rounded-t-lg'>
                        <CardTitle className='text-center text-xl'>
                            Sign In
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
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='email'
                                                    placeholder='Enter your email'
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
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder='Enter your password'
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
                                    Sign In
                                </Button>
                            </form>
                        </Form>

                        <div className='mt-6 text-center'>
                            <p className='text-navy-600'>
                                Don't have an account?{' '}
                                <Link
                                    href='/register'
                                    className='text-ocean-500 hover:text-ocean-600 font-semibold'
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
