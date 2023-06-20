import {useState } from 'react';

import {Box, TextField} from '@mui/material';
import Chip from '@mui/material/Chip';

// import InputList from '../input-list/InputList';


function QuestionTextboxMult() {

    let [textList, setTextList] = useState([]);
    let [textInput, setTextInput] = useState("");

    var addTextInput = () => {
        if (textInput.trim() !== '') {
            setTextList(textList.concat(textInput));
            setTextInput("");
        }
    }

    function deleteItem(i) {
        let tmp = [...textList];
        tmp.splice(i, 1);
        setTextList(tmp);
    }

    // ********************* Styling **********************

    const textBoxStyle = {
        '& input': {
            padding: '12px 10px',
        },
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.05)',
            backgroundColor: '#D9D9D91A',
        },
        '& label': {
            top: '-4px',
        },
        '.MuiInputLabel-shrink': {
            top: '0px',
            left: '1px',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        },
        '& p': {
            marginTop: '1px',
            fontSize: '11px',
        },
        maxHeight: '47px',
    }

    const textChipStyle = {
        marginTop: '10px',
        marginRight: '6px',
    }

    return (
        <Box fullWidth>
            <Box fontSize='17px' marginBottom='18px'>
                What is your major?
            </Box>

            <TextField
                fullWidth
                sx = {textBoxStyle}
                onChange = {(e) => {
                    setTextInput(e.target.value);
                }}
                onKeyDown = {(e) => {
                    (e.key === "Enter" || e.key === ',' 
                        || e.key === '.' || e.key === ';') && addTextInput();
                }}
                value = {textInput}
            />

            {/* <InputList 
                list = {textList}
                setList = {setTextList}
            /> */}

            <Box paddingLeft = '3px'>
                {textList.map((x, key) => (
                        <Chip
                            label={x}
                            key={key}
                            onDelete={() => deleteItem(key)}
                            variant='outlined'
                            size='small'
                            sx={textChipStyle}
                        />
                ))}
            </Box>
        </Box>
    )
}

export default QuestionTextboxMult;