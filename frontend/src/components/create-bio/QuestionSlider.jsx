import {Box} from '@mui/material';
import Slider from '@mui/material/Slider';

function QuestionSlider() {

    const tempMarks = [
        {
            value: 66,
            label: '66°F',
        },
        {
            value: 71,
            label: '71°F',
        },
        {
            value: 76,
            label: '76°F',
        },
    ]

    return(
        <Box fullWidth>
            <Box fontSize='17px' marginBottom='18px'>
                What is your preferred room temperature?
            </Box>
            <Box paddingLeft='13px' paddingRight='13px'>
                <Slider
                    defaultValue={71}
                    // getAriaValueText={tempText}
                    step={1}
                    valueLabelDisplay='auto'
                    marks={tempMarks}
                    min={66}
                    max={76}
                />
            </Box>
        </Box>
        
    )
}

export default QuestionSlider;