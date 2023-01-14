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
                            <button>Accept</button>
                            <button>Reject</button>
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