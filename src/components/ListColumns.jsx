import Column from '@components/Column';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ListColumns = ({ columns }) => {

    return (
        <SortableContext items={columns.map(column => column._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                widows: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden'
            }}>

                {/*Columm*/}
                {columns && columns.map(column => (
                    <Column key={column?._id} column={column} />
                ))}

                {/*Add new column */}
                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    mx: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d'
                }}>
                    <Button
                        startIcon={<NoteAddIcon />}
                        sx={{
                            color: 'primary.contrastText',
                            width: '100%',
                            alignItems: 'center',
                            padding: 1
                        }}
                    >
                        Add new column</Button>
                </Box>
            </Box>
        </SortableContext>
    );
};

export default ListColumns;