import axios from '../AxiosInstance';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CreateProfile() {

    const navigate = useNavigate();


    const logout = async () => {
        axios.delete('/logout').then(() => {
            Cookies.remove('email');
            navigate('/');
        });
    }

    return (
        <div>
            <h1>Create Bio</h1>
            <button onClick = {logout}>Logout</button>
        </div>
    )
}

export default CreateProfile;