import TrelloIcon from '@assets/trello.svg?react';
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DropdownMenu from './DropdownMenu';
import ModeSwitch from './ModeSwitch';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Divider from '@mui/material/Divider';
import Cloud from '@mui/icons-material/Cloud';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { useState } from 'react';

const MENU = [
    {
        id: 1,
        title: 'Copy',
        type: 'option',
        icon: <ContentCopy />
    },
    {
        id: 2,
        title: 'Cut',
        type: 'option',
        icon: <ContentCut />
    },
    {
        id: 3,
        title: 'Paste',
        type: 'option',
        icon: <ContentPaste />
    },
    {
        id: 4,
        title: 'Divider',
        type: 'divider',
        icon: <Divider />
    },
    {
        id: 5,
        title: 'Web Clipboard',
        type: 'option',
        icon: <Cloud />
    }
]

const MENU_ACCOUNT = [
    {
        id: 1,
        title: 'Profile',
        type: 'personal',
    },
    {
        id: 2,
        title: 'My account',
        type: 'personal',
    },
    {
        id: 3,
        title: 'Divider',
        type: 'divider',
        icon: <Divider />
    },
    {
        id: 4,
        title: 'Add another account',
        type: 'option',
        icon: <PersonAdd />
    },
    {
        id: 5,
        title: 'Settings',
        type: 'option',
        icon: <Settings />
    },
    {
        id: 6,
        title: 'Logout',
        type: 'option',
        icon: <Logout />
    },
]

const AppBar = () => {
    const [searchString, setSearchString] = useState('');

    const handleOnChangeSearch = (e) => setSearchString(e.target.value);

    const handleClearSearch = () => setSearchString('');

    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            overflowX: 'hidden',
            bgcolor: 'primary.dark'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button sx={{ padding: '0', minWidth: '2rem', height: '2rem', color: 'primary.contrastText' }}>
                    <AppsIcon />
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'primary.contrastText' }} />
                    <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.contrastText' }}>
                        Trello
                    </Typography>
                </Box>

                <Box sx={{ display: { md: 'none', lg: 'flex', sm: 'none', xs: 'none' }, gap: 1, alignItems: 'center' }}>
                    <DropdownMenu title='Workspaces' menu={MENU} />
                    <DropdownMenu title='Recent' menu={MENU} />
                    <DropdownMenu title='Starred' menu={MENU} />
                    <DropdownMenu title='Templates' menu={MENU} />
                    <Button
                        variant="outlined"
                        startIcon={<LibraryAddIcon />}
                        sx={{
                            color: 'primary.contrastText',
                            '&.MuiButton-outlined': {
                                border: '1px solid',
                                borderColor: 'primary.contrastText'
                            }
                        }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search"
                    type="text"
                    value={searchString}
                    onChange={handleOnChangeSearch}
                    size='small'
                    sx={{ display: { sm: 'inline-block', xs: 'none' } }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ cursor: 'pointer', color: 'primary.contrastText' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <CloseIcon
                                    fontSize='small'
                                    sx={{
                                        cursor: 'pointer',
                                        color: searchString ? 'primary.contrastText' : 'transparent'
                                    }}
                                    onClick={handleClearSearch}
                                />
                            )
                        },
                    }}
                />
                <ModeSwitch />
                <Tooltip title='Search' sx={{ display: { md: 'none' } }}>
                    <SearchIcon sx={{ cursor: 'pointer', color: 'primary.contrastText', display: { sm: 'none' } }} />
                </Tooltip>
                <Tooltip title='Notification'>
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer', color: 'primary.contrastText' }}>
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>
                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.contrastText', display: { xs: 'none', sm: 'inline-block' } }} />
                </Tooltip>

                <DropdownMenu title='Account settings' menu={MENU_ACCOUNT} />
            </Box>
        </Box>
    );
};

export default AppBar;