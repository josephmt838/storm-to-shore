'use client';

import { getTypeColor } from '@/components/media/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingIcon } from '@/components/ui/loading-icon';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar, FaClock } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function ArticleContent({ id }) {
    // Fetch single article
    const { data: article, isLoading } = useQuery({
        queryKey: [`/articles/${id}`],
        queryFn: async () => {
            const response = await apiRequest('GET', `articles/${id}`);
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='w-full flex justify-center'>
                        <LoadingIcon size='xl' />
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className='min-h-screen bg-navy-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <Card>
                        <CardContent className='p-8 text-center'>
                            <h1 className='text-2xl font-bold text-navy-700 mb-4'>
                                Article Not Found
                            </h1>
                            <p className='text-navy-600'>
                                The article you're looking for doesn't exist or
                                has been removed.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-navy-50 py-12 px-4'>
            <div className='max-w-4xl mx-auto'>
                <Card className='border-2 border-navy-200'>
                    <CardContent className='p-8'>
                        <div className='mb-6'>
                            <Badge
                                className={`${getTypeColor(article.type)} mb-4`}
                            >
                                {article.category}
                            </Badge>
                            <h1 className='text-3xl font-bold text-navy-700 mb-4'>
                                {article.title}
                            </h1>
                            <div className='flex flex-wrap gap-4 text-sm text-navy-500'>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar className='w-4 h-4' />
                                    {new Date(
                                        article.date,
                                    ).toLocaleDateString()}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaClock className='w-4 h-4' />
                                    {article.duration}
                                </span>
                            </div>
                        </div>

                        <div className='prose prose-navy max-w-none'>
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
