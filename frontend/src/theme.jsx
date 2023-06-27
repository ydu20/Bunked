import {createTheme, responsiveFontSizes} from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: "Lato, sans-serif",
    },
    palette: {
        background: {
            default: '#F2F9FA',
        },
        primary: {
            light: '#F2F9FA',
            main: '#00B2B7',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '13px',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.1)',
                }
            }
        },
        MuiSlider:{
            styleOverrides: {
                thumb: {
                    '&.Mui-focused, &.Mui-activated, &.Mui-jumped, &:hover': {
                        boxShadow:'none',
                    },
                    ' &.Mui-focusVisible': {
                        boxShadow:'none',
                    },
                    ' &.Mui-active': {
                        boxShadow:'none',
                    },
                },
                mark: {
                    display: 'none',
                  },
            }
            
        },
    }
});

export default responsiveFontSizes(theme);