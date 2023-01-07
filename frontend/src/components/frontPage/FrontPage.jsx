import {useRef, useEffect, useState } from 'react'
import './FrontPage.css';
import bunkedLogo from '../../BunkedLogo.png';
import Login from './Login';


function FrontPage() {

    return (
        <div className = "front-page-wrapper">
            <div className = "front-page-left">
            <img src={bunkedLogo} className="bunked-logo" alt = "Send"/>
            </div>
            <div className = "front-page-right">
                <div className = "login-box-strip">
                    <div className = "login-box-margin-top"/>

                    <Login/>

                    
                    <div className = "login-box-margin-bottom" />
                </div>
                
            </div>
        </div>
    );
}



export default FrontPage;

