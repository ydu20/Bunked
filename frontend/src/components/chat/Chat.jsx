import {Box, Grid, Paper, Stack, TextField} from '@mui/material';


function Chat() {
    
    // ********************* Variables & Functions **********************



    // ********************* Styling **********************


    const matchListWrapperStyle = {
        height: '100%',
    }

    const msgWrapperStyle = {

    }

    return (
            <Grid container direction = 'row' height = '100%'>
                <Grid item xs = {4}>
                    <Box sx = {matchListWrapperStyle}>
                        <Stack>
                            Chat
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs = {8}>
                    <Box sx = {msgWrapperStyle}>

                    </Box>
                </Grid>
            </Grid>
    );
}

export default Chat;