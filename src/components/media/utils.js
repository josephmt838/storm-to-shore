import {
    FaBookOpen,
    FaFileAlt,
    FaMusic,
    FaVideo,
} from 'react-icons/fa';

export const getMediaIcon = (type) => {
    switch (type) {
        case 'video':
            return <FaVideo className='w-6 h-6' />;
        case 'audio':
            return <FaMusic className='w-6 h-6' />;
        case 'article':
            return <FaFileAlt className='w-6 h-6' />;
        default:
            return <FaBookOpen className='w-6 h-6' />;
    }
};

export const getTypeColor = (type) => {
    switch (type) {
        case 'video':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'audio':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'article':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
}; 