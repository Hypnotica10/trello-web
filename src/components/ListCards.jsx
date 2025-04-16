import Card from '@components/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';

const CARDS_LIST_STYLES = {
    padding: '0 5px',
    margin: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} -
        ${theme.spacing(5)} -
        ${theme.trello.columnHeaderHeight} -
        ${theme.trello.columnFooterHeight}
    )`,
    '&::-webkit-scrollbar': { width: '5px' },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', borderRadius: '5px' },
    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'bfc2cf' },
    '&::-webkit-scrollbar-track': { margin: 0 }
}

const ListCards = ({ cards }) => {
    return (
        <SortableContext items={cards.map(column => column._id)} strategy={verticalListSortingStrategy}>
            <Box sx={CARDS_LIST_STYLES}>
                {cards && cards.map(card => (<Card key={card?._id} card={card} />))}
            </Box>
        </SortableContext>
    );
};

export default ListCards;