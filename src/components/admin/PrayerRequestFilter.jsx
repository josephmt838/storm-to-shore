import { Button } from '@/components/ui/button';
import { APPROVED, PENDING, REJECTED } from '@/lib/constants';

export function PrayerRequestFilter({ selectedFilter, setSelectedFilter }) {
    const filters = [
        { value: 'all', label: 'All Requests' },
        { value: PENDING, label: 'Pending' },
        { value: APPROVED, label: 'Approved' },
        { value: REJECTED, label: 'Rejected' },
    ];

    return (
        <div className='flex gap-2 mb-6'>
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    variant={
                        selectedFilter === filter.value ? 'default' : 'outline'
                    }
                    onClick={() => setSelectedFilter(filter.value)}
                    className={
                        selectedFilter === filter.value
                            ? 'bg-ocean-500 text-white hover:bg-ocean-600'
                            : 'text-navy-600 hover:bg-navy-50'
                    }
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}
