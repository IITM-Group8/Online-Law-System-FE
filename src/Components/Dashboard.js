import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../Components/Navbar'

function Dashboard(){

    let location = useLocation();
    const locationState = location.state;    
     const userName = 'Amalesh';
     const role = 'Admin';
    // console.log("userName in Dashboard: ", userName);

    return (
        <React.Fragment>
            <Navbar userName = {userName} role = {role}/>          
            
        </React.Fragment>
    );    
}

export default Dashboard;