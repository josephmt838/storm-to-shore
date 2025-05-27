import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IoMail, IoMailOpen } from 'react-icons/io5';

export function ContactMessagesTab({ contacts }) {
    if (contacts.length === 0) {
        return (
            <Card className='border-2 border-navy-200 text-center py-12'>
                <CardContent>
                    <IoMail className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                    <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                        No Contact Messages
                    </h3>
                    <p className='text-navy-500'>
                        Contact messages from your discipleship website will appear here.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className='space-y-6'>
            {contacts.map((contact) => (
                <Card
                    key={contact.id}
                    className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'
                >
                    <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                        <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                                <CardTitle className='text-navy-700 text-lg mb-2'>
                                    Message from {contact.name}
                                </CardTitle>
                                <div className='flex items-center gap-4 text-sm text-navy-600'>
                                    <span>Email: {contact.email}</span>
                                    <span>
                                        Date:{' '}
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <Badge className='bg-blue-100 text-blue-800 border-blue-200'>
                                Contact
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className='p-6'>
                        <div className='mb-4'>
                            <h4 className='font-semibold text-navy-700 mb-2'>
                                Message:
                            </h4>
                            <p className='text-navy-600 whitespace-pre-wrap leading-relaxed'>
                                {contact.message}
                            </p>
                        </div>
                        <div className='pt-4 border-t border-navy-200'>
                            <Button
                                className='bg-ocean-500 hover:bg-ocean-600 text-white'
                                onClick={() =>
                                    window.open(
                                        `mailto:${contact.email}?subject=Re: Your message to Storm to Shore Discipleship`,
                                    )
                                }
                            >
                                <IoMailOpen className='w-4 h-4 mr-2' />
                                Reply to {contact.name}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 