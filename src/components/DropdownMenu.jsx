import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

const DropdownMenu = ({ title, menu }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            {title === 'Account settings' ? (
                <Tooltip title='Account settings'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ padding: 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 30, height: 30 }} src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' />
                    </IconButton>
                </Tooltip>
            ) : title === 'More options' ? (
                <Tooltip title='More options'>
                    <ExpandMoreIcon
                        sx={{
                            color: 'text.primary',
                            cursor: 'pointer'
                        }}
                        id='column-dropdown'
                        aria-controls={open ? 'menu-dropdown' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                </Tooltip>
            ) : (
                <Button
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<ExpandMoreIcon />}
                    sx={{ color: 'primary.contrastText' }}
                >
                    {title}
                </Button>
            )}

            <Menu
                id={title === 'Account settings' ? 'account-menu' : title === 'More options' ? 'menu-dropdown' : 'basic-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menu && menu.length > 0 && menu.map(item => {
                    if (item.type === 'divider') return item.icons;
                    if (item.type === 'personal') return (
                        <MenuItem key={item.id} onClick={handleClose}>
                            <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> {item.title}
                        </MenuItem>
                    );
                    return (
                        <MenuItem key={item.id} onClick={handleClose}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>{item.title}</ListItemText>
                        </MenuItem>
                    )
                }
                )}
            </Menu>
        </Box>
    );
};

export default DropdownMenu;