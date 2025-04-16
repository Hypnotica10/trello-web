import ListCards from '@components/ListCards';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DropdownMenu from './DropdownMenu';

const ColumnOverlay = ({ column }) => {
    return (
        <Box
            sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: 'secondary.main',
                ml: 2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
            }}>

            {/**columm header*/}
            <Box sx={{
                height: (theme) => theme.trello.columnHeaderHeight,
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h6' sx={{
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    {column?.title}
                </Typography>
                <DropdownMenu title='More options' />
            </Box>

            {/**columm content*/}
            <ListCards cards={column?.cards} />

            {/**columm footer*/}
            <Box sx={{
                height: (theme) => theme.trello.columnFooterHeight,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Button
                    startIcon={<AddCardIcon />}
                    sx={{
                        color: 'text.primary'
                    }}
                >
                    Add new card
                </Button>
                <Tooltip title='Drag to move'>
                    <DragHandleIcon sx={{ cursor: 'grab' }} />
                </Tooltip>
            </Box>
        </Box>
    );
};

export default ColumnOverlay;