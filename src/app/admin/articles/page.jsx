'use client';

import ArticleCard from '@/components/admin/articles/ArticleCard';
import ArticleForm from '@/components/admin/articles/ArticleForm';
import NoArticles from '@/components/admin/articles/NoArticles';
import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';
import { LoadingIcon } from '@/components/ui/loading-icon';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

const Articles = () => {
    // Fetch articles
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['/articles'],
        queryFn: async () => {
            const response = await apiRequest('GET', 'articles');
            return response.json();
        },
    });

    return (
        <AdminProtectedRoute>
            <div className='container mx-auto py-8 min-h-[700px]'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Manage Articles</h1>
                    <ArticleForm />
                </div>
                <div className='h-[500px] content-center'>
                    {isLoading ? (
                        <div className='w-full flex justify-center'>
                            <LoadingIcon size='xl' />
                        </div>
                    ) : articles.length === 0 ? (
                        <NoArticles />
                    ) : (
                        <div className='grid gap-4'>
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminProtectedRoute>
    );
};

export default Articles;
