import { FaPlay } from 'react-icons/fa';

export default function MediaHeader({
    title = 'Media Library',
    description = "Encouraging content to strengthen your faith journey. Find sermons, devotionals, testimonies, and worship resources to help you navigate life's storms.",
    icon = (
        <FaPlay className='w-10 sm:w-12 h-10 sm:h-12 mx-auto text-ocean-500 mb-4' />
    ),
}) {
    return (
        <div className='text-center mb-8 sm:mb-12'>
            {icon}
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-700 mb-4 px-4'>
                {title}
            </h1>
            <p className='text-base sm:text-lg text-navy-600 max-w-2xl mx-auto px-4 leading-relaxed'>
                {description}
            </p>
        </div>
    );
}
