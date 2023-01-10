import {useEffect, useState} from 'react';
import './Home.css';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bio, setBio] = useState({});

    useEffect(() => {

        const temp = () => {
            axios.get(`/get-bio?email=${encodeURIComponent(Cookies.get('email'))}`)
            .then(async (res) => {
                setBio(res.data);
                setLoading(false);
            })
            .catch(err => {
                Cookies.remove('email');
                setBio({err: true});
                setLoading(false);
            })
        };

        temp();
        
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
        } else if (bio.notCreated) {
            return <Navigate to = "/create-bio"/>
        } else {
            return (
                <div>
                        <h1>Homepage and shit</h1>
                        <button onClick = {logout}>Logout</button>
                </div>
            )
        }
    } else {
        return <>Loading...</>;
    }
    
}

export default Home;