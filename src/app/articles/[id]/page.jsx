import { mediaContent } from '@/data/media';
import ArticleContent from '../../../components/admin/media/ArticleContent';

// Generate static paths for all articles
export async function generateStaticParams() {
    // Filter for articles only
    const articles = mediaContent.filter(
        (item) => item.type === 'article' || item.type === 'resource',
    );

    return articles.map((article) => ({
        id: article.id.toString(),
    }));
}

export default async function ArticlePage({ params }) {
    const { id } = await params;
    return <ArticleContent id={id} />;
}
