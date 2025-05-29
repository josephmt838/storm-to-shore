import { cn } from '@/lib/utils';

export function LoadingIcon({ className, size = 'default' }) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        default: 'w-16 h-16',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
    };

    return (
        <div className={cn('relative', sizeClasses[size], className)}>
            <div className='absolute inset-0 animate-spin'>
                <div className='w-full h-full border-4 border-ocean-500/20 rounded-full border-t-ocean-500 border-r-navy-600'></div>
            </div>
            <div className='absolute inset-0 animate-pulse'>
                <div className='w-full h-full border-4 border-navy-600/20 rounded-full border-t-navy-600 border-r-ocean-500'></div>
            </div>
        </div>
    );
}
