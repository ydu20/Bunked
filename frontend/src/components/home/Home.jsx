import {useEffect, useState} from 'react';
import './Home.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Matching from "../matching/Matching";


function Home() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState({});

    const [displayMatching, setDisplayMatching] = useState(true);

    useEffect(() => {

        const temp = () => {
            axios.get(`/get-bio?email=${encodeURIComponent(Cookies.get('email'))}`)
            .then(async (res) => {
                setBio(res.data);
                setLoading(false);
            })
            .catch(() => {
                Cookies.remove('email');
                setBio({err: true});
                setLoading(false);
            })
        };

        temp();
        
    }, []);

    const toggleMatching = () => {
        setDisplayMatching(!displayMatching);
    }


    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        });
    }

    if (!Cookies.get('email')) {
        return <Navigate to = "/"/>;
    } else if (!loading) {
        if (bio.err) {
            return <Navigate to = "/"/>;
        } 
        // Disabled for development:
        // else if (bio.notCreated) {
        //     return <Navigate to = '/create-bio' state = {{internal: true}}/>;
        // } 
        else {
            return (
                <div className = "homepage-container">

                    <div className = "sidebar-wrapper">
                        <div className = "sidebar">
                            <h1>Homepage and shit</h1>
                            <div>User: {` ${Cookies.get('email')}`}</div>

                            <button className = "temp-toggle" onClick = {toggleMatching}> Toggle Matching UI</button>

                            <button className = "home-logout" onClick = {logout}>Logout</button>
                        </div>
                    </div>
                    <div className = "interface-wrapper">
                        <div className = "interface-inner-wrapper">
                            { displayMatching ? 
                                <Matching /> : ""
                            }
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return <>Loading...</>;
    }
    
}

export default Home;