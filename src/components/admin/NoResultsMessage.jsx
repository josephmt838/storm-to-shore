import { APPROVED, PENDING, REJECTED } from '@/lib/constants';
import { FaSearch } from 'react-icons/fa';
import { Card, CardContent } from '../ui/card';

function NoResultsMessage({ selectedFilter }) {
    const getMessage = () => {
        switch (selectedFilter) {
            case PENDING:
                return 'No pending prayer requests at this time.';
            case APPROVED:
                return 'No approved prayer requests found.';
            case REJECTED:
                return 'No rejected prayer requests found.';
            case 'CONTACT':
                return 'Contact messages from your discipleship website will appear here.';
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

export default NoResultsMessage;
