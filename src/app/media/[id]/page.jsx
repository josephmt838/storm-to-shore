import { mediaContent } from '@/data/media';
import MediaContent from '../../../components/admin/media/MediaContent';

// Generate static paths for all media items
export async function generateStaticParams() {
    // Filter for non-article media
    const mediaItems = mediaContent.filter(
        (item) => item.type === 'video' || item.type === 'audio',
    );

    return mediaItems.map((media) => ({
        id: media.id.toString(),
    }));
}

export default async function MediaPage({ params }) {
    const { id } = await params;
    return <MediaContent id={id} />;
}
