import {useEffect, useState} from 'react';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import { useNavigate, Navigate, useLocation} from 'react-router-dom';

function CreateProfile() {

    const navigate = useNavigate();
    const {state} = useLocation();


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
            multiple: false,
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
            structure: "options",
            private: false,
            multiple: true,
            options: ["Quad", "Hill", "KCECH", "DuBois", "High Rises", "Off Campus"],
        },


    ]


    useEffect (() => {

    }, []);

    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        });
    }

    // Disabled for development:
    // if (!state || !state.internal) {
    //     return <Navigate to = '/'/>;
    // } else {
        return (
            <div>
                <h1>Create Bio</h1>

                <button onClick = {logout}>Logout</button>
            </div>
        )
    // }

}

export default CreateProfile;