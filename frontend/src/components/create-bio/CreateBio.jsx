import {useEffect, useState} from 'react';
import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import { useNavigate, Navigate, useLocation} from 'react-router-dom';

function CreateProfile() {

    const navigate = useNavigate();
    const {state} = useLocation();

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