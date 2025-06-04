import { Card, CardContent } from '@/components/ui/card';
import { FaFileAlt } from 'react-icons/fa';
import MediaForm from './MediaForm';

const NoMedia = () => {
    return (
        <Card>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
                <FaFileAlt className='w-12 h-12 text-gray-400 mb-4' />
                <h3 className='text-lg font-semibold mb-2'>No Media Yet</h3>
                <p className='text-gray-500 mb-4'>
                    Get started by creating your first media item.
                </p>
                <MediaForm />
            </CardContent>
        </Card>
    );
};

export default NoMedia;
