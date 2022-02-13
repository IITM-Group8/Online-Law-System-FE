import React from 'react';
import { Navigate } from 'react-router-dom';

import Navbar from './Navbar'
import * as CommonConstants from '../../Constants/CommonConstants.js'

function Dashboard() {
    
    const userName = localStorage.getItem(CommonConstants.USER_NAME);
    const userRole = localStorage.getItem(CommonConstants.USER_ROLE);    
    console.log("userName and userRole : ", userName, userRole);
    if(userName === null || userRole === null){
        console.log("User details are empty: ", userRole);
        return (
            <React.Fragment>
               <Navigate to="/home" replace={true} loginNeeded={true} />
            </React.Fragment>
        );
    }
            
    return (
        <React.Fragment>
            <Navbar userName={userName} role={userRole} />
        </React.Fragment>
    );
}

export default Dashboard;