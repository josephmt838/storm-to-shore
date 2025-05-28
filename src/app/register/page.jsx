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
import { FaUserPlus } from 'react-icons/fa';
import * as z from 'zod';

const formSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        birthdate: z.string().refine((date) => {
            const today = new Date();
            const birthDate = new Date(date);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            return age >= 13;
        }, 'You must be at least 13 years old'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export default function Register() {
    const { toast } = useToast();
    const { signUp } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            birthdate: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await signUp(data.email, data.password, {
                birthdate: data.birthdate,
                name: `${data.firstName} ${data.lastName}`,
            });

            toast({
                title: 'Registration Successful',
                description: 'Please check your email for verification code',
                variant: 'success',
            });
            router.push('/confirm');
        } catch (error) {
            toast({
                title: 'Registration Failed',
                description:
                    error.message || 'An error occurred during registration',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-md mx-auto'>
                <div className='text-center mb-8'>
                    <FaUserPlus className='w-12 h-12 mx-auto text-ocean-500 mb-4' />
                    <h1 className='text-4xl font-bold text-navy-700 mb-4'>
                        Create Account
                    </h1>
                    <p className='text-lg text-navy-600'>
                        Join our community and start your journey with us
                    </p>
                </div>

                <Card className='border-2 border-navy-200 shadow-lg'>
                    <CardHeader className='bg-gradient-to-r from-ocean-500 to-navy-600 text-white rounded-t-lg'>
                        <CardTitle className='text-center text-xl'>
                            Registration Form
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-8'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-6'
                            >
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='firstName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your first name'
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
                                        name='lastName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-navy-700 font-semibold'>
                                                    Last Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Enter your last name'
                                                        className='border-navy-200 focus:border-ocean-500'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

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
                                    name='birthdate'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Date of Birth
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='date'
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

                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-navy-700 font-semibold'>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    placeholder='Confirm your password'
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
                                    Create Account
                                </Button>
                            </form>
                        </Form>

                        <div className='mt-6 text-center'>
                            <p className='text-navy-600'>
                                Already have an account?{' '}
                                <Link
                                    href='/login'
                                    className='text-ocean-500 hover:text-ocean-600 font-semibold'
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
