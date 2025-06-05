import ArticleContent from '@/components/admin/media/ArticleContent';

// Generate static paths for all articles
export async function generateStaticParams() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        );
        const articles = await response.json();

        return articles.map((article) => ({
            id: article.id,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function ArticlePage({ params }) {
    const { id } = await params;
    return <ArticleContent id={id} />;
}
