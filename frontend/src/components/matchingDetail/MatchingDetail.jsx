import './MatchingDetail.css';
import { useState, useEffect } from 'react';
import axios from '../AxiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function MatchingDetail() {
    // baseEmail is the email of the current user
    const baseEmail = Cookies.get('email')
    
    // targetUser is the user dictionary that contains details about the user
    const {state} = useLocation()
    const targetUser = state.user

    const navigate = useNavigate()

    useEffect(() => {

    }, [])


    // // Function to get the next recommended user from recommendedUser array
    // const nextRec = async () => {
    //     if (index + 1 >= userArr.length) {
    //         setLoading(true);
    //         await resetRecommend();
    //         setTimeout(() => {setIndex(0); setLoading(false)}, 500);
    //     } else {
    //         setIndex(index + 1);
    //         setLastIndex(index + 1);
    //     }
    // }

    // Method to check if there is a match between the newly accepted user and current user, and handle the match if there is
    const handleMatch = async () => {
        const match = (await axios.get('/actions/checkMatch', {params: {firstEmail: baseEmail, secEmail: targetUser.email}})).data; // Check if there is a match between the newly accepted user
        if (match) {
            alert("Matched!");
            // TODO: Handle the match here, create new chat room/send new message
        }
    }

    // Function to add user to waiting room
    const addWaitRoom = () => {
        axios.post('/actions/addUserWait', {baseEmail: baseEmail, targetEmail: targetUser.email})
        .then(res => {
            alert("Added to waiting room");
        }).catch( err =>
            alert('ERROR: ' + err)
        )
    }

    // Function accept user
    const acceptUser = () => {
        // TODO: Need to implement checking if there is a match
        axios.post('/actions/acceptUser', {baseEmail: baseEmail, targetEmail: targetUser.email})
        .then(res => {
            alert("User Accepted");
            handleMatch(); // Check and handle match
            navigate('/home');
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }

    // Reject user
    const rejectUser = () => {
        axios.post('/actions/rejectUser', {baseEmail: baseEmail, targetEmail: targetUser.email})
        .then(res => {
            alert("User Rejected");
            navigate('/home');
        }).catch(err => 
            alert('ERROR: ' + err) 
        )
    }


    return (      
    <div className = 'matching-container'>
        {
            // TODO: Finish adding all user fields and styling
        }
        <h1>    
            Name: {targetUser.name}
        </h1>
        <p>
            Gender: {targetUser.gender}
        </p>
        <p>
            Major: {targetUser.majors}
        </p>
        <p>
            Hobbies: {targetUser.hobbies}
        </p>
        {/* <button onClick = {() => {addWaitRoom()}}>WaitRoom</button> */}
        <button onClick = {() => {acceptUser()}}>Accept</button>
        <button onClick = {() => {rejectUser()}}>Reject</button>
    </div> 
    
    );
}

export default MatchingDetail;