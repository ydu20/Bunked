import {useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import './FrontPage.css';
import bunkedLogo from '../../BunkedLogo.png';
import Login from './Login';
import { Navigate } from 'react-router-dom';


function FrontPage() {

    if (Cookies.get('email')) {
        return <Navigate to = "/home"/>;
    } else {
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
}



export default FrontPage;

