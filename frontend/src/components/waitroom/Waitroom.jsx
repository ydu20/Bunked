import axios from '../AxiosInstance';
import { useEffect, useState } from 'react';
import './Waitroom.css'

function Waitroom({baseEmail}) {
    // baseEmail is the email address of the current logged in user


    const [roomUsers, setRoomUsers] = useState([]); // State for all users in the current user's waiting room

    const init = () => {
        // Initial function to retrieve all users in waiting room from database and setting the state to be displayed

        axios.get('/actions/getWaitUsers', {params: {email: baseEmail}})
        .then(async (res) => {
            setRoomUsers(res.data);
        })
        .catch(err => 
            alert('ERROR: ' + err)    
        )
    }

    useEffect(() => {
        init();
    }, [])

    // Function to accept a user off waitlist
    // targetEmail is the email of the person being accepted
    const acceptUser = async (targetEmail) => {
        await axios.post('/actions/updateUserWait', {baseEmail: baseEmail, targetEmail: targetEmail, actionType: 0});
        const newUserArr = roomUsers.filter(user => user.email !== targetEmail);
        setRoomUsers(newUserArr);
    }

    // Function to reject user off waitlist
    // targetEmail is the email of the person being rejected
    const rejectUser = async (targetEmail) => {
        await axios.post('/actions/updateUserWait', {baseEmail: baseEmail, targetEmail: targetEmail, actionType: 2});
        const newUserArr = roomUsers.filter(user => user.email !== targetEmail);
        setRoomUsers(newUserArr);
    }

    return (
        <>
        <h1>This is the waiting room</h1>
        <div className="waitingRoom">
            {
                roomUsers.map(user => {
                    return (
                        <>
                        <div className='singleUserDiv'>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <button onClick={() => {acceptUser(user.email)}}>Accept</button>
                            <button onClick={() => {rejectUser(user.email)}}>Reject</button>
                        </div>
                        <hr></hr>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}

export default Waitroom;