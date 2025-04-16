import DropdownMenu from '@components/DropdownMenu';
import ListCards from '@components/ListCards';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddCardIcon from '@mui/icons-material/AddCard';
import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const MENU = [
    {
        id: 1,
        title: 'Add new card',
        type: 'option',
        icon: <AddCardIcon />
    },
    {
        id: 2,
        title: 'Copy',
        type: 'option',
        icon: <ContentCopy />
    },
    {
        id: 3,
        title: 'Cut',
        type: 'option',
        icon: <ContentCut />
    },
    {
        id: 4,
        title: 'Paste',
        type: 'option',
        icon: <ContentPaste />
    },
    {
        id: 5,
        title: 'Divider',
        type: 'divider',
        icon: <Divider />
    },
    {
        id: 6,
        title: 'Remove this column',
        type: 'option',
        icon: <DeleteForeverIcon />
    },
    {
        id: 7,
        title: 'Archie this column',
        type: 'option',
        icon: <Cloud />
    },
]

const Column = ({ column }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column },
    });
    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        // The height of the column, set to 100% to fill its container and listeners in box wrapper column, otherwise there will be annoying error when dragg and drop  
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    };

    return (
        <div
            ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: 'secondary.main',
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
                    <DropdownMenu title='More options' menu={MENU} />
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
        </div>
    );
};

export default Column;