import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APPROVED, PENDING, REJECTED } from '@/lib/constants';
import { useState } from 'react';
import { FaCalendar, FaCheck, FaEye, FaHeart, FaSearch } from 'react-icons/fa';
import { PiHandsPraying } from 'react-icons/pi';
import { PrayerRequestFilter } from './PrayerRequestFilter';

function NoResultsMessage({ selectedFilter }) {
    const getMessage = () => {
        switch (selectedFilter) {
            case PENDING:
                return 'No pending prayer requests at this time.';
            case APPROVED:
                return 'No approved prayer requests found.';
            case REJECTED:
                return 'No rejected prayer requests found.';
            default:
                return 'No prayer requests match the current filter.';
        }
    };

    return (
        <Card className='border-2 border-navy-200 text-center py-12'>
            <CardContent>
                <FaSearch className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                    No Results Found
                </h3>
                <p className='text-navy-500'>{getMessage()}</p>
            </CardContent>
        </Card>
    );
}

export function PrayerRequestsTab({
    prayers,
    handleStatusUpdate,
    updateStatusMutation,
}) {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredPrayers = prayers.filter((prayer) => {
        if (selectedFilter === 'all') return true;
        return prayer.prayerStatus === selectedFilter;
    });

    if (prayers.length === 0) {
        return (
            <Card className='border-2 border-navy-200 text-center py-12'>
                <CardContent>
                    <FaHeart className='w-16 h-16 mx-auto text-navy-300 mb-4' />
                    <h3 className='text-xl font-semibold text-navy-600 mb-2'>
                        No Prayer Requests
                    </h3>
                    <p className='text-navy-500'>
                        Prayer requests will appear here for review and
                        approval.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <PrayerRequestFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
            <div className='space-y-6'>
                {filteredPrayers.length === 0 ? (
                    <NoResultsMessage selectedFilter={selectedFilter} />
                ) : (
                    filteredPrayers.map((prayer) => (
                        <Card
                            key={prayer.id}
                            className='border-2 border-navy-200 hover:border-ocean-400 transition-colors shadow-md'
                        >
                            <CardHeader className='bg-gradient-to-r from-ocean-50 to-navy-50'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex-1'>
                                        <CardTitle className='text-navy-700 text-xl mb-2'>
                                            {prayer.title || 'Prayer Request'}
                                        </CardTitle>
                                        <div className='flex items-center gap-4 text-sm text-navy-600'>
                                            <span className='flex items-center gap-1'>
                                                <FaHeart className='w-6 h-6 text-ocean-500' />
                                                {prayer.name || 'Anonymous'}
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <FaCalendar className='w-6 h-6 text-ocean-500' />
                                                {new Date(
                                                    prayer.date,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Badge
                                        className={`${
                                            prayer.prayerStatus === APPROVED
                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                : prayer.prayerStatus ===
                                                  REJECTED
                                                ? 'bg-red-100 text-red-700 border-red-200'
                                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                        }`}
                                    >
                                        {prayer.prayerStatus || PENDING}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className='p-6'>
                                <p className='text-navy-600 leading-relaxed whitespace-pre-wrap mb-4'>
                                    {prayer.text}
                                </p>
                                <div className='mb-4 p-3 bg-ocean-50 border border-ocean-200 rounded-md flex gap-2 justify-evenly'>
                                    <p className='text-sm text-ocean-700 flex gap-2 justify-center items-center'>
                                        <PiHandsPraying /> {prayer.count || 0}
                                    </p>
                                    <p className='text-sm text-ocean-700 flex gap-2 justify-center items-center'>
                                        <FaCheck /> Follow Up:{' '}
                                        {prayer.followUp === 'true'
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                    <p className='text-sm text-ocean-700 flex gap-2 justify-center items-center'>
                                        <FaEye /> Public:{' '}
                                        {prayer.isPublic === 'true'
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                </div>
                                <div className='flex gap-2'>
                                    <Button
                                        onClick={() =>
                                            handleStatusUpdate(
                                                prayer.id,
                                                APPROVED,
                                                prayer.isPublic,
                                            )
                                        }
                                        disabled={
                                            updateStatusMutation.isPending ||
                                            prayer.prayerStatus !== PENDING
                                        }
                                        className='bg-green-600 hover:bg-green-700'
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleStatusUpdate(
                                                prayer.id,
                                                REJECTED,
                                                prayer.isPublic,
                                            )
                                        }
                                        disabled={
                                            updateStatusMutation.isPending ||
                                            prayer.prayerStatus !== PENDING
                                        }
                                        variant='destructive'
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
