import './Matching.css';
import { useState, useEffect } from 'react';

function Matching({baseEmail}) {
    // baseEmail is the email of the current user

    const recommendedUsers = 0;

    // Initial function to get things from DB
    const init = () => {

    }

    return (
    <div className = 'matching-container'>
        <h1>
            {baseEmail}
        </h1>
    </div>
    );
}

export default Matching;