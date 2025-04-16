import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { useColorScheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function ModeSwitch() {
    const { mode, setMode } = useColorScheme();

    if (!mode) {
        return null;
    }

    const handleChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <FormControl size="small" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
            <InputLabel id="theme-mode">Mode</InputLabel>
            <Select
                labelId="theme-mode"
                id="select-dark-light-mode"
                value={mode}
                label="mode"
                onChange={handleChange}
            >
                <MenuItem value='light'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightModeOutlinedIcon fontSize='small' /> Light
                    </Box>
                </MenuItem>
                <MenuItem value='dark'><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DarkModeOutlinedIcon fontSize='small' /> Dark
                </Box></MenuItem>
                <MenuItem value='system'><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SettingsBrightnessOutlinedIcon fontSize='small' /> System
                </Box></MenuItem>
            </Select>
        </FormControl>
    );
}

export default ModeSwitch;