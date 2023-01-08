import {useEffect, useState} from 'react';
import './Home.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        })
    }

    if (!Cookies.get('email')) {
        return <Navigate to = "/"/>;
    } else {
        Cookies.set('email', Cookies.get('email'), {expires: 3});
        return (
            <div>
                <h1>Homepage and shit</h1>

                <button onClick = {logout}>Logout</button>
            </div>
        );
    }
}

export default Home;