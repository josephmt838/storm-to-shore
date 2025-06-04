import { Card, CardContent } from '@/components/ui/card';
import { FaFileAlt } from 'react-icons/fa';
import ArticleForm from './ArticleForm';

const NoArticles = () => {
    return (
        <Card>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
                <FaFileAlt className='w-12 h-12 text-gray-400 mb-4' />
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                    No Articles Yet
                </h3>
                <p className='text-gray-500 mb-4'>
                    Get started by creating your first article.
                </p>
                <ArticleForm />
            </CardContent>
        </Card>
    );
};

export default NoArticles;
