import { Button } from '@/components/ui/button';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function MediaCTA() {
    return (
        <section className='mt-16 text-center'>
            <div className='bg-gradient-to-r from-ocean-600 to-navy-700 text-white p-8 rounded-lg shadow-lg'>
                <h3 className='text-2xl font-bold mb-4 text-white'>
                    Stay Connected with Our Latest Content
                </h3>
                <p className='text-lg text-gray-100 mb-6 leading-relaxed'>
                    Get notified when we publish new sermons,
                    devotionals, and encouraging resources.
                </p>
                <Button size='lg'>
                    <FaExternalLinkAlt className='w-5 h-5 mr-2' />
                    Subscribe to Updates
                </Button>
            </div>
        </section>
    );
} 