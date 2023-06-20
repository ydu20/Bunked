import {useState } from 'react';
import {Box} from '@mui/material';
import Slider from '@mui/material/Slider';

function QuestionRange() {

    // ********************* Variables & Functions **********************

    const minSleep = 1;

    // 8pm -> 0; 11am -> 15
    const [sleepHours, setSleepHours] = useState([0, 17]);

    const sleepMarks = [
        {
            value: 0,
            label: '8pm',
        },
        {
            value: 5,
            label: '1am',
        },
        {
            value: 10,
            label: '6am',
        },
        {
            value: 15,
            label: '11am',
        },
    ]

    const handleSleepChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
            setSleepHours([Math.min(newValue[0], sleepHours[1] - minSleep), sleepHours[1]]);
        } else {
            setSleepHours([sleepHours[0], Math.max(newValue[1], sleepHours[0] + minSleep)]);
        }
    };


    const getSleepLabel = (value) => {
        const hours = value === 0 ? 8 : value === 15 ? 11 : value + 8;
        const period = hours >= 12 ? 'am' : 'pm';
        const formattedHours = hours > 12 ? hours - 12 : hours;
      
        return `${formattedHours}${period}`;
    };

    return(
        <Box fullWidth>
            <Box fontSize='17px' marginBottom='18px'>
                What is your sleep schedule?
            </Box>
            
            <Box paddingLeft='13px' paddingRight='13px'>
                <Slider
                    value={sleepHours}
                    onChange={handleSleepChange}
                    marks={sleepMarks}
                    min={0}
                    max={15}
                    valueLabelDisplay='auto'
                    valueLabelFormat={(value) => getSleepLabel(value)}
                    disableSwap
                />

            </Box> 
        </Box>
        
    )
}

export default QuestionRange;