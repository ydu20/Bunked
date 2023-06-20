import {Box} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function QuestionChoice() {

    const selectStyle = {
        '& .MuiSelect-select': {
            paddingTop: '10px',
            paddingBottom: '10px',
        },
        '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
        },
    }

    const menuStyle = {
        slotProps: {
            paper: {
                sx: {
                    borderRadius: '4px',
                    width: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    '& ul': {
                        display: 'flex',
                        flexDirection: 'column',
                        '& li': {
                            minHeight: '43px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                        },
                        '& .MuiTouchRipple-root': {
                            display: 'none',
                        },
                    },
                    
                },
            }
        },
    }

    return (
        <Box fullWidth>
            <Box fontSize = '17px' marginBottom='18px'>
                What is your gender?
            </Box>

            <Select
                id='bio-gender'
                fullWidth
                sx = {selectStyle}
                MenuProps = {menuStyle}
            >
                <MenuItem value={10}>
                    Male
                </MenuItem>
                <MenuItem value={20}>
                    Female
                </MenuItem>
                <MenuItem value = {30}>
                    Other
                </MenuItem>
            </Select>
        </Box>
    )
}

export default QuestionChoice;