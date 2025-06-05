import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaCalendar, FaClock, FaPlay } from 'react-icons/fa';
import { getMediaIcon, getTypeColor } from './utils';

export default function MediaCard({
    item,
    isFeatured = false,
    type = 'article',
}) {
    if (isFeatured) {
        return (
            <Card className='border-2 border-ocean-200 hover:border-ocean-400 transition-colors shadow-lg'>
                <CardHeader className='bg-gradient-to-r from-ocean-600 to-navy-700 text-white p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
                        <div className='flex-1'>
                            <CardTitle className='text-lg sm:text-xl mb-2 flex items-center gap-2 leading-tight font-bold'>
                                {getMediaIcon(type)}
                                <span className='break-words'>
                                    {item.title}
                                </span>
                            </CardTitle>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-100'>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar className='w-4 h-4' />
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaClock className='w-4 h-4' />
                                    {item.duration}
                                </span>
                            </div>
                        </div>
                        <Badge
                            className={`border-white self-start font-semibold ${getTypeColor(
                                type,
                            )}`}
                        >
                            {item.category}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className='p-6'>
                    {item.thumbnail && (
                        <div className='w-full h-40 bg-navy-100 rounded-lg mb-4 flex items-center justify-center'>
                            <FaPlay className='w-12 h-12 text-navy-400' />
                        </div>
                    )}
                    <p className='text-navy-600 mb-4 leading-relaxed'>
                        {item.description}
                    </p>
                    <Button
                        className='w-full bg-ocean-500 hover:bg-ocean-600 text-white'
                        asChild
                    >
                        <Link
                            href={
                                type === 'article'
                                    ? `/articles/${item.id}`
                                    : `/media/${item.id}`
                            }
                        >
                            <FaPlay className='w-4 h-4 mr-2' />
                            {type === 'article' ? 'Read Article' : 'Play Now'}
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className='border-2 border-navy-200 hover:border-ocean-400 transition-colors'>
            <CardContent className='p-6'>
                <div className='flex flex-col sm:flex-row items-start gap-4'>
                    <div className='flex-shrink-0 w-full sm:w-auto'>
                        <div className='w-full sm:w-20 h-20 bg-gradient-to-br from-ocean-500 to-navy-600 rounded-lg flex items-center justify-center text-white'>
                            {getMediaIcon(type)}
                        </div>
                    </div>
                    <div className='flex-1 min-w-0 w-full'>
                        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3'>
                            <h3 className='text-lg sm:text-xl font-semibold text-navy-700 leading-tight break-words'>
                                {item.title}
                            </h3>
                            <Badge
                                className={`${getTypeColor(
                                    type,
                                )} flex-shrink-0`}
                            >
                                {type}
                            </Badge>
                        </div>
                        <p className='text-navy-600 mb-4 leading-relaxed text-sm sm:text-base'>
                            {item.description}
                        </p>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-navy-500'>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar className='w-4 h-4' />
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaClock className='w-4 h-4' />
                                    {item.duration}
                                </span>
                                <Badge
                                    variant='outline'
                                    className='text-ocean-600 border-ocean-300 self-start'
                                >
                                    {item.category}
                                </Badge>
                            </div>
                            <Button
                                variant='outline'
                                className='border-ocean-500 text-ocean-600 hover:bg-ocean-50 w-full sm:w-auto'
                                asChild
                            >
                                <Link
                                    href={
                                        type === 'article'
                                            ? `/articles/${item.id}`
                                            : `/media/${item.id}`
                                    }
                                >
                                    <FaPlay className='w-4 h-4 mr-2' />
                                    {type === 'article' ? 'Read' : 'Play'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
