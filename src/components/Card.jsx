import { useSortable } from '@dnd-kit/sortable';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import { Card as CardMui } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ card }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id,
        data: { ...card }
    });
    const dndKitCardStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        // touchAction: 'none', // sendor default PointerSensor
    };
    const showCardActions = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }
    return (
        <CardMui
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
            sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset',
                opacity: card?.FE_PlaceholderCard ? '0' : '1',
                pointerEvents: card?.FE_PlaceholderCard ? 'none' : 'auto'
            }}
        >
            {card?.cover && (
                <CardMedia sx={{ height: 140 }} image={card?.cover} />
            )}
            <CardContent sx={{ padding: 1.5, '&:last-child': { padding: 1.5 } }}>
                <Typography>
                    {card?.title}
                </Typography>
            </CardContent>
            {showCardActions() && (
                <CardActions sx={{ padding: '0 4px 8px' }}>
                    {!!card?.memberIds.length && (
                        <Button size='small' startIcon={<GroupIcon />} sx={{ color: 'primary.light' }}>{card?.memberIds.length}</Button>
                    )}
                    {!!card?.comments.length && (
                        <Button size='small' startIcon={<CommentIcon />} sx={{ color: 'primary.light' }}>{card?.comments.length}</Button>
                    )}
                    {!!card?.attachments.length > 0 && (
                        <Button size='small' startIcon={<AttachmentIcon />} sx={{ color: 'primary.light' }}>{card?.attachments.length}</Button>
                    )}
                </CardActions>
            )}
        </CardMui>
    );
};

export default Card;