import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const CHIP_STYLES = {
    color: 'primary.contrastText',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    '.MuiSvgIcon-root': {
        color: 'primary.contrastText'
    },
}

const BoardBar = ({ board }) => {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
            padding: '0 1rem',
            bgcolor: 'primary.main'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    icon={<DashboardIcon />}
                    label={board?.title}
                    clickable
                    sx={CHIP_STYLES}
                />
                <Chip
                    icon={<VpnLockIcon />}
                    label={board?.type.replace(board?.type[0], board?.type[0].toUpperCase())}
                    clickable
                    sx={CHIP_STYLES}
                />
                <Chip
                    icon={<AddToDriveIcon />}
                    label='Add to Google Drive'
                    clickable
                    sx={CHIP_STYLES}
                />
                <Chip
                    icon={<BoltIcon />}
                    label='Automation'
                    clickable
                    sx={CHIP_STYLES}
                />
                <Chip
                    icon={<FilterListIcon />}
                    label='Filters'
                    clickable
                    sx={CHIP_STYLES}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant='outlined'
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color: 'primary.contrastText',
                        '&.MuiButton-outlined': {
                            border: '1px solid',
                            borderColor: 'primary.contrastText'
                        }
                    }}
                >
                    Invite
                </Button>

                <AvatarGroup
                    max={4}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            fontSize: 16,
                            border: 1,
                            color: 'primary.contrastText',
                            cursor: 'pointer',
                            bgcolor: '#a4b0de'
                        }
                    }}
                >
                    <Tooltip title='Remy Sharp'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                    <Tooltip title='Remy Sharp'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                    <Tooltip title='Remy Sharp'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                    <Tooltip title='Remy Sharp'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                    <Tooltip title='Remy Sharp'>
                        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
};

export default BoardBar;