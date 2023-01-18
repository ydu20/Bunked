import './Matching.css';
import { useState, useEffect } from 'react';
import axios from '../AxiosInstance';

function Matching({baseEmail, userArr, lastIndex, setLastIndex, resetRecommend}) {
    // baseEmail is the email of the current user
    // userArr is the array of recommended user objects

    const [index, setIndex] = useState(-1); // State for which index of recommended user array we are on
    const [loading, setLoading] = useState(false); // State for if loading content or not

    useEffect(() => {

        // Initial function to get things from DB
        const init = () => {
            setIndex(lastIndex)
        }

        init();

    }, [])


    // Function to get the next recommended user from recommendedUser array
    const nextRec = async () => {
        if (index + 1 >= userArr.length) {
            setLoading(true);
            await resetRecommend();
            setTimeout(() => {setIndex(0); setLoading(false)}, 500);
        } else {
            setIndex(index + 1);
            setLastIndex(index + 1);
        }
    }

    // Method to check if there is a match between the newly accepted user and current user, and handle the match if there is
    const handleMatch = async () => {
        const match = (await axios.get('/actions/checkMatch', {params: {firstEmail: baseEmail, secEmail: userArr[index].email}})).data; // Check if there is a match between the newly accepted user
        if (match) {
            alert("Matched!");
            // TODO: Handle the match here, create new chat room/send new message
        }
    }

    // Function to add user to waiting room
    const addWaitRoom = () => {
        axios.post('/actions/addUserWait', {baseEmail: baseEmail, targetEmail: userArr[index].email})
        .then(res => {
            alert("Added to waiting room");
            nextRec();
        }).catch( err =>
            alert('ERROR: ' + err)
        )
    }

    // Function accept user
    const acceptUser = () => {
        // TODO: Need to implement checking if there is a match
        axios.post('/actions/acceptUser', {baseEmail: baseEmail, targetEmail: userArr[index].email})
        .then(res => {
            alert("User Accepted");
            nextRec();
            handleMatch(); // Check and handle match
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }

    // Reject user
    const rejectUser = () => {
        axios.post('/actions/rejectUser', {baseEmail: baseEmail, targetEmail: userArr[index].email})
        .then(res => {
            alert("User Rejected");
            nextRec();
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }


    return ( 
    loading ?
    <div>
        <h1>LOADING</h1>
    </div> :
     
    <div className = 'matching-container'>
        {
            // TODO: Finish adding all user fields and styling
        }
        <h1>    
            Name: {index !== -1 && userArr[index].name}
        </h1>
        <p>
            Gender: {index !== -1 && userArr[index].gender}
        </p>
        <p>
            Major: {index !== -1 && userArr[index].majors}
        </p>
        <p>
            Hobbies: {index !== -1 && userArr[index].hobbies}
        </p>
        <button onClick = {() => {nextRec()}}>Next</button>
        <button onClick = {() => {addWaitRoom()}}>WaitRoom</button>
        <button onClick = {() => {acceptUser()}}>Accept</button>
        <button onClick = {() => {rejectUser()}}>Reject</button>
    </div> 
    
    );
}

export default Matching;