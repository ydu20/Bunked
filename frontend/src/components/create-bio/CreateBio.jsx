import {useEffect, useRef, useState} from 'react';
import './CreateBio.css';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import { useNavigate, Navigate, useLocation} from 'react-router-dom';
import CreateBioQuestion from './CreateBioQuestion';

function CreateProfile() {

    var questions = [
        {
            param: "gender",
            question: "What is your gender?",
            required: true,
            type: "string",
            structure: "options",
            private: false,
            multiple: false,
            options: ["Male", "Female", "Other", "Prefer not to say"],
        },
        {
            param: "majors",
            question: "What is/are your majors?",
            required: true,
            type: "string",
            structure: "input",
            private: false,
            multiple: true,
            options: [],
        },
        {
            param: "year",
            question: "What year will you be this fall?",
            required: true,
            type: "number",
            structure: "options",
            private: false,
            multiple: false,
            options: ["Freshman", "Sophomore", "Junior", "Senior"],
        },
        {
            param: "extroversion",
            question: "Would you rather go out or stay in?",
            required: true,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["Def staying in", "Prefer staying in", "Hmmm", "Prefer going out", "Def going out"],
        },
        {
            param: "cleanliness",
            question: "How clean do you keep your room?",
            required: true,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["It's a mess", "Almost a mess", "Meh", "Pretty clean", "Pristine"],
        },
        {
            param: "noise",
            question: "Do you mind your room being noisy?",
            required: true,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["I plan on throwing parties", "Nah", "Only when I'm sleeping", "Only when I'm sleeping and studying", "I prefer quiet"]
        },
        {
            param: "sleep",
            question: "What's your weekday sleep schedule?",
            required: false,
            type: "number",
            structure: "sleepSpecial",
            private: true,
            multiple: false,
            options: [],
        },
        {
            param: "guests",
            question: "Guests in the room?",
            required: false,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["No guests", "Some guests", "Don't mind", "Want guests"]
        },
        {
            param: "dorm",
            question: "Where do you plan on living?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: true,
            options: ["Quad", "Hill", "KCECH", "DuBois", "High Rises", "Off Campus"],
        },
        {
            param: "greek",
            question: "Do you plan on joining greek life?",
            required: false,
            type: "number",
            structure: "options",
            private: false,
            multiple: false,
            options: ["Nope", "Prob not", "Maybe", "Considering it", "Yes"],
        }, 
        {
            param: "smoke",
            question: "Do you smoke?",
            required: false,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["Never", "Socially", "Yes"],
        }, 
        {
            param: "drink",
            question: "Do you drink?",
            required: false,
            type: "number",
            structure: "options",
            private: true,
            multiple: false,
            options: ["Never", "Socially", "Yes"]
        },
        {
            param: "hobbies",
            question: "What are your hobbies?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: true,
            options: [],
        },
        {
            param: "hometown",
            question: "Where do you call home?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: false,
            options: [],
        },
        {
            param: "music",
            question: "Favorite music genres?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: true,
            options: [],
        },
        {
            param: "shows",
            question: "Favorite TV shows?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: true,
            options: [],
        },
        {
            param: "instagram",
            question: "What's your instagram?",
            required: false,
            type: "string",
            structure: "input",
            private: false,
            multiple: false,
            options: [],
        }
    ]

    const navigate = useNavigate();
    const {state} = useLocation();
    
    var [questionNum, setQuestionNum] = useState(0);
    


    // var [ans, setAns] = useState("");
    // var [listAns, setListAns] = useState([]);

    // var answer = {
    //     ans, setAns,
    //     listAns, setListAns,
    // };

    useEffect (() => {

    }, []);

    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        });
    }

    const childRefs = useRef([]);

    // const resetAns = () => {
    //     setAns("");
    //     setListAns([]);
    // }

    const prevQ = async () => {
        console.log(childRefs.current[questionNum].getAns());
        setQuestionNum(questionNum - 1);
        // resetAns();
    }

    const nextQ = async () => {
        setQuestionNum(questionNum + 1);
        console.log(childRefs.current[questionNum].getAns());
        // resetAns();
    }

    const submit = async () => {

    }

    // Disabled for development:
    // if (!state || !state.internal) {
    //     return <Navigate to = '/'/>;
    // } else {
        return (
            <div className = 'create-bio-wrapper'>
                <h1 className = "create-bio-title">Create Bio</h1>
                { Cookies.get('email') ? "" : <h1>Not Logged In!</h1> }
                
                <div className = "q-wrapper">
                    {/* <CreateBioQuestion 
                        question = {questions[questionNum]}
                        answer = {answer}
                    /> */}
                    {questions.map((question, key) => {
                        if (key === questionNum) {
                            return (
                                <CreateBioQuestion
                                    ref = {e => (childRefs.current[key] = e)}
                                    question = {question}
                                    // bio = {bio}
                                    className = {"bio-question bio-question-open"}
                                    key = {key}
                                />
                            );
                        } else {
                            return (
                                <CreateBioQuestion
                                    ref = {e => (childRefs.current[key] = e)}
                                    question = {question}
                                    // bio = {bio}
                                    className = {"bio-question bio-question-closed"}
                                    key = {key}
                                />
                            );
                        }
                    })}
                </div>
                
                {/* <button onClick = {logout}>Logout</button> */}

                <div className = "bio-btn-container">
                    <div className = "bl-btn-wrapper">
                        {questionNum === 0 ? 
                            ""
                            :
                            <button className = "bio-question-btn" 
                                onClick = {prevQ}>
                                Back
                            </button>
                        }
                    </div>
                    <div className = "br-btn-wrapper">
                        {questionNum === questions.length - 1 ? 
                            <button className = "bio-question-btn"
                                onClick = {submit}>
                                Submit
                            </button>
                            :
                            <button className = "bio-question-btn"
                                onClick = {nextQ}>
                                Next
                            </button>
                        }
                    </div>
                    
                </div>
            </div>
        )
    // }

}

export default CreateProfile;