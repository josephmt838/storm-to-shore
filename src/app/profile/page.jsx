'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast({
                title: 'Signed out successfully',
                description: 'You have been signed out of your account.',
            });
        } catch (error) {
            toast({
                title: 'Error signing out',
                description: 'There was a problem signing out of your account.',
                variant: 'destructive',
            });
        }
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-navy-900">
                            Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-ocean-100 p-3 rounded-full">
                                    <FaUser className="h-6 w-6 text-ocean-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-navy-900">
                                        {user?.name || 'User'}
                                    </h3>
                                    <p className="text-navy-600">Account Holder</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-ocean-100 p-3 rounded-full">
                                    <FaEnvelope className="h-6 w-6 text-ocean-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-navy-900">
                                        Email
                                    </h3>
                                    <p className="text-navy-600">{user?.email}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleSignOut}
                                    variant="outline"
                                    className="w-full flex items-center justify-center space-x-2"
                                >
                                    <FaSignOutAlt />
                                    <span>Sign Out</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
} 