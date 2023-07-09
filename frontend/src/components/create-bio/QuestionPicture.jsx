import {useState, useRef} from 'react';
import {Box, Grid, Paper} from '@mui/material';
import Button from '@mui/material/Button';


function QuestionPicture({label, question, changeAnswer, visible}) {
    // ********************* Variables & Functions **********************

    let [pics, setPics] = useState([]);

    const hiddenInput = useRef();

    const addPic = (e) => {
        console.log(e.target.files);
        setPics([...pics, URL.createObjectURL(e.target.files[0])]);
    }

    // ********************* Styling **********************

    const uploadStyle = {
        border: '3px dashed lightslategray',
        height: '187px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '50px',
        color: 'lightslategray',
        cursor: 'pointer',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        '&:hover': {
        backgroundColor: 'rgba(119,136,153, 0.1)',
        },
        '&:active': {
            backgroundColor: 'rgba(119,136,153, 0.17)',
            },
    }

    const emptyPicStyle = {
        border: '3px dashed lightslategray',
        height: '187px',
        borderRadius: '10px',
    }

    const pictureWrapperStyle = {
        padding: '1px',
        height: '187px',
        border: 'solid 1px transparent',
        overflow: 'hidden',
    }

    const pictureStyle = {
        height: '100%',
        borderRadius: '10px',
        objectFit: 'cover',
        overflow: 'hidden',
    }

    return (
        <Box display = {visible ? 'block' : 'none'}>
            <Box fontSize = '17px' marginBottom={'18px'}>
                <Box>
                    {question}
                </Box>
            </Box>
            <Box>
                <Grid container columns = {12} spacing = {2}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <Grid item xs = {4} key = {i}>
                            {(i === pics.length) ? (
                                <>
                                    <input 
                                        id = "upload-files"
                                        type="file" 
                                        onChange={addPic}
                                        accept="image/png, image/jpeg"
                                        ref = {hiddenInput}
                                        hidden
                                    />
                                    <Box sx = {uploadStyle} onClick = {() => {hiddenInput.current.click()}}>
                                        <p>+</p>
                                    </Box>
                                </>
                            ) : i < pics.length ? (
                                <Box style = {pictureWrapperStyle}>
                                    <img src={pics[i]} style = {pictureStyle}/>
                                </Box>
                            ) : (
                                <Box sx = {emptyPicStyle}/>                                    
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
        </Box>
    )
}

export default QuestionPicture;