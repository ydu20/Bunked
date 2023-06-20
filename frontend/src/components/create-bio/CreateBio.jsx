// import {useEffect, useRef, useState} from 'react';
// import './CreateBio.css';
// import axios from '../AxiosInstance';
// import Cookies from 'js-cookie';
// import { useNavigate, Navigate, useLocation} from 'react-router-dom';
// import CreateBioQuestion from './CreateBioQuestion';

// function CreateProfile() {

//     var questions = [
//         {
//             param: "gender",
//             question: "What is your gender?",
//             required: true,
//             type: "string",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Male", "Female", "Other", "Prefer not to say"],
//         },
//         {
//             param: "majors",
//             question: "What is/are your majors?",
//             required: true,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "year",
//             question: "What year will you be this fall?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Freshman", "Sophomore", "Junior", "Senior"],
//         },
//         {
//             param: "extroversion",
//             question: "Would you rather go out or stay in?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Def staying in", "Prefer staying in", "Hmmm", "Prefer going out", "Def going out"],
//         },
//         {
//             param: "cleanliness",
//             question: "How clean do you keep your room?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["It's a mess", "Almost a mess", "Meh", "Pretty clean", "Pristine"],
//         },
//         {
//             param: "noise",
//             question: "Do you mind your room being noisy?",
//             required: true,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["I plan on throwing parties", "Nah", "Only when I'm sleeping", "Only when I'm sleeping and studying", "I prefer quiet"]
//         },
//         {
//             param: "sleep",
//             question: "What's your weekday sleep schedule?",
//             required: false,
//             type: "number",
//             structure: "sleepSpecial",
//             private: true,
//             multiple: false,
//             options: [],
//         },
//         {
//             param: "guests",
//             question: "Guests in the room?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["No guests", "Some guests", "Don't mind", "Want guests"]
//         },
//         {
//             param: "dorm",
//             question: "Where do you plan on living?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: ["Quad", "Hill", "KCECH", "DuBois", "High Rises", "Off Campus"],
//         },
//         {
//             param: "greek",
//             question: "Do you plan on joining greek life?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: false,
//             multiple: false,
//             options: ["Nope", "Prob not", "Maybe", "Considering it", "Yes"],
//         }, 
//         {
//             param: "smoke",
//             question: "Do you smoke?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Never", "Socially", "Yes"],
//         }, 
//         {
//             param: "drink",
//             question: "Do you drink?",
//             required: false,
//             type: "number",
//             structure: "options",
//             private: true,
//             multiple: false,
//             options: ["Never", "Socially", "Yes"]
//         },
//         {
//             param: "hobbies",
//             question: "What are your hobbies?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "hometown",
//             question: "Where do you call home?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: false,
//             options: [],
//         },
//         {
//             param: "music",
//             question: "Favorite music genres?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "shows",
//             question: "Favorite TV shows?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: true,
//             options: [],
//         },
//         {
//             param: "instagram",
//             question: "What's your instagram?",
//             required: false,
//             type: "string",
//             structure: "input",
//             private: false,
//             multiple: false,
//             options: [],
//         }
//     ]

//     const navigate = useNavigate();
//     const {state} = useLocation();
    
//     var [questionNum, setQuestionNum] = useState(0);

//     var [filled, setFilled] = useState(false);
//     var [error, setError] = useState("");

//     useEffect (() => {

//     }, []);

//     const logout = async () => {
//         axios.delete('/logout').then(() => {
//             Cookies.remove('email');
//             navigate('/');
//         });
//     }

//     const childRefs = useRef([]);

//     const prevQ = async () => {
//         console.log(childRefs.current[questionNum].getAns());
//         console.log(childRefs.current[questionNum].getListAns());

//         setQuestionNum(questionNum - 1);
//         setError("");
//         // resetAns();
//     }

//     const nextQ = async () => {
//         if (questions[questionNum].type === "string") {
//             if ((questions[questionNum].multiple && childRefs.current[questionNum].getListAns().length === 0) ||
//                 (!questions[questionNum].multiple && childRefs.current[questionNum].getAns().length === 0)) {
//                     // if (!questions[questionNum].required) {
//                     //     return skipQ();
//                     // } else {
//                         return setError("Please enter an input.");
//                     // }
//             }
//         }

//         childRefs.current[questionNum].setSkip(false);
//         setQuestionNum(questionNum + 1);
//         setError("");

//         console.log(childRefs.current[questionNum].getAns());
//         console.log(childRefs.current[questionNum].getListAns());

//         // resetAns();
//     }

//     const skipQ = async () => {
//         childRefs.current[questionNum].setSkip(true);
//         if (questionNum === questions.length - 1) {
//             return submit();
//         }
//         setError("");
//         setQuestionNum(questionNum + 1);
//     }

//     const submit = async () => {
//         var bioInfo = {};
//         questions.map((q, index) => {
//             var curr = childRefs.current[index]
//             if (!curr.getSkip()) {
//                 if (q.structure === "sleepSpecial") {
//                     bioInfo[q.param] = {
//                         start: parseInt(curr.getListAns()[0]),
//                         end: parseInt(curr.getListAns()[1]),
//                     }
//                 } else if (q.multiple) {
//                     bioInfo[q.param] = curr.getListAns();
//                 } else if (q.type === "number") {
//                     bioInfo[q.param] = parseInt(curr.getAns());
//                 } else if (q.type === "string") {
//                     bioInfo[q.param] = curr.getAns();
//                 }
//             }
//         });

        
//         bioInfo["email"] = Cookies.get('email');
//         axios.post('/create-bio', bioInfo).then((res) => {
//             console.log(res.data)
//         }).catch((error) => {
//             console.log(error.response.data);
//         });
//     }

//     // Disabled for development:
//     // if (!state || !state.internal) {
//     //     return <Navigate to = '/'/>;
//     // } else {
//         return (
//             <div className = 'create-bio-wrapper'>
//                 { Cookies.get('email') ? "" : <h1>Not Logged In!</h1> }
                
//                 <div className = "q-wrapper">
//                     {/* <CreateBioQuestion 
//                         question = {questions[questionNum]}
//                         answer = {answer}
//                     /> */}
//                     {questions.map((question, key) => {
//                         if (key === questionNum) {
//                             return (
//                                 <CreateBioQuestion
//                                     ref = {e => (childRefs.current[key] = e)}
//                                     question = {question}
//                                     // bio = {bio}
//                                     className = {"bio-question bio-question-open"}
//                                     key = {key}
//                                 />
//                             );
//                         } else {
//                             return (
//                                 <CreateBioQuestion
//                                     ref = {e => (childRefs.current[key] = e)}
//                                     question = {question}
//                                     // bio = {bio}
//                                     className = {"bio-question bio-question-closed"}
//                                     key = {key}
//                                 />
//                             );
//                         }
//                     })}
//                     {error.length === 0 ? 
//                         ""
//                         :
//                         <div className = "bio-error-msg">{error}</div>
//                     }

//                 </div>
                
//                 {/* <button onClick = {logout}>Logout</button> */}

//                 <div className = "bio-btn-container">
//                     <div className = "bl-btn-wrapper">
//                         {questionNum === 0 ? 
//                             ""
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg" 
//                                 onClick = {prevQ}>
//                                 Back
//                             </button>
//                         }
//                     </div>
//                     <div className = "br-btn-wrapper">
//                         {questions[questionNum].required ? 
//                             ""
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg" id = "bio-skip-btn"
//                                 onClick = {skipQ}>
//                                 Skip
//                             </button>
                    
//                         }
                        
//                         {questionNum === questions.length - 1 ? 
//                             <button className = "bio-question-btn btn btn-info btn-lg"
//                                 onClick = {submit}>
//                                 Submit
//                             </button>
//                             :
//                             <button className = "bio-question-btn btn btn-info btn-lg"
//                                 onClick = {nextQ}>
//                                 Next
//                             </button>
                            
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     // }

// }

// export default CreateProfile;


import {useRef, useEffect, useState } from 'react';
import {Box, Button, Grid, Paper, Stack, TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';

import QuestionChoice from './QuestionChoice'
import QuestionTextboxMult from './QuestionTextboxMult'
import QuestionSlider from './QuestionSlider'
import QuestionRange from './QuestionRange'

function CreateProfile() {

    // ********************* Variables & Functions **********************




    // ********************* Styling **********************

    const mainContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    }

    const createBioPanelStyle = {
        width: '380px',
        padding: '30px 30px 25px 30px',
        backgroundColor: 'white',
    }


    const buttonStyle = {
        color: 'white',
        textTransform: 'none',
        padding: '4px 12px 4px 12px',
        fontSize: '17px',
        fontWeight: 500,
        borderRadius: '5px',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'rgba(0, 178, 183, 0.85)',
            boxShadow: 'none'
        },
        '&:active': {
            backgroundColor: 'rgba(0, 178, 183, 0.7)',
        }
    }




    return (
        <>
            <Box sx = {mainContainerStyle}>
                <Paper sx = {createBioPanelStyle}>
                    <Stack spacing='25px'>


                        {/* <QuestionChoice/> */}
                        {/* <QuestionTextboxMult/> */}
                        {/* <QuestionSlider/> */}
                        <QuestionRange/>
                        {/*********************Textbox Multiple*********************/}

                            {/* <Box fontSize='17px' marginBottom='18px'>
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

                            <InputList 
                                list = {textList}
                                setList = {setTextList}
                            /> */}
                            

                        {/*********************Single Slider*********************/}

                            {/* <Box fontSize='17px' marginBottom='18px'>
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
                            </Box> */}
                            
                        {/*********************Range Slider*********************/}
                        
                        {/* <Box fontSize='17px' marginBottom='18px'>
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

                        </Box> */}

                        <Grid
                            container
                            justifyContent="space-between"
                            columns={30}
                        >
                            <Grid item xs={8}>
                                <Button 
                                    variant='contained'
                                    sx={buttonStyle}
                                    fullWidth
                                    disableRipple
                                >
                                    Previous
                                </Button>
                            </Grid>
                            
                            <Grid item xs={14}> 
                                <Grid
                                    container
                                    justifyContent='space-between'
                                    columns={14}
                                >
                                    <Grid item xs={6}>
                                        <Button
                                            variant = 'contained'
                                            sx = {buttonStyle}
                                            fullWidth
                                            disableRipple
                                        >
                                            Skip
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant = 'contained'
                                            sx = {buttonStyle}
                                            fullWidth
                                            disableRipple
                                        >
                                            Next
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}



export default CreateProfile;