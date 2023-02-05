import {useEffect, useState} from 'react';
import './Home.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
import Matching from "../matching/Matching";
import Waitroom from '../waitroom/Waitroom';


function Home() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState({});

    const [displayMode, setDisplayMode] = useState(0); // 0 for matching, 1 for waiting room, 2 for chat

    const [recommendedUsers, setRecommendedUsers] = useState([]); // Recommended users

    const [lastIndex, setLastIndex] = useState(-1); // Keep track of which index the matching was on

    const resetRecommend = async () => { // Resets the recommended users when lastIndex hits the end of user array
        axios.get('/recommend', {params:{email:Cookies.get('email')}}) // Get recommended users from API
        .then(async (res) => {
            setRecommendedUsers(res.data);
            setLastIndex(0);
        })
    }


    useEffect(() => {

        const init = () => {
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

            // Get recommended users for matching component
            axios.get('/recommend', {params:{email:Cookies.get('email')}}) // Get recommended users from API
            .then(async (res) => {
                setRecommendedUsers(res.data);
            })

            setLastIndex(0);

        };

        init();
        
    }, []);


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
                            <h1>Homepage</h1>
                            <div>User: {` ${Cookies.get('email')}`}</div>

                            <p>Options:</p>

                            <button className = "temp-toggle" onClick = {() => {setDisplayMode(0)}}>Matching</button>

                            <button className = "waitroom-toggle" onClick = {() => {setDisplayMode(1)}}>Waiting Room</button>

                            <button className = "chat-toggle" onClick = {() => {setDisplayMode(2)}}>Chat</button>

                            <button className = "home-logout" onClick = {logout}>Logout</button>
                        </div>
                    </div>
                    <div className = "interface-wrapper">
                        <div className = "interface-inner-wrapper">
                            { recommendedUsers.length>0 && displayMode === 0 && 
                                <Matching baseEmail={Cookies.get('email')} userArr={recommendedUsers} lastIndex = {lastIndex} setLastIndex = {setLastIndex} resetRecommend={resetRecommend}/>
                            }
                            {
                                displayMode === 1 && <Waitroom baseEmail={Cookies.get('email')}/>
                            }
                            {// TO DO: ADD CHAT COMPONENT HERE
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