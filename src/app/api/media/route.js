import { mediaContent } from '@/data/media';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Filter content to only show articles and resources
        const articlesContent = mediaContent.filter(
            (item) => item.type === 'article' || item.type === 'resource',
        );

        return NextResponse.json(articlesContent);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch media content' },
            { status: 500 },
        );
    }
}
