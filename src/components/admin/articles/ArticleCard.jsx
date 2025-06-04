'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import ArticleForm from './ArticleForm';

const ArticleCard = ({ article }) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Delete article mutation
    const deleteArticleMutation = useMutation({
        mutationFn: async (id) => {
            const response = await apiRequest('DELETE', `articles/${id}`);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/articles'] });
            toast({
                title: 'Article Deleted',
                description: 'The article has been deleted successfully.',
                variant: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Failed to delete article. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            deleteArticleMutation.mutate(id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                        <CardTitle>{article.title}</CardTitle>
                        <p className='text-sm text-gray-500 mt-1'>
                            {article.category} • {article.duration}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <ArticleForm article={article} />
                        <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => handleDelete(article.id)}
                        >
                            <FaTrash className='mr-2' />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-gray-600'>{article.description}</p>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
