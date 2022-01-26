import React from 'react';
import { useLocation } from 'react-router-dom'

import '../Styles/innerheader.css';
import InnerHeader from '../Components/InnerHeader'
import Navbar from '../Components/Navbar'

function Dashboard(){

    let location = useLocation();
    const locationState = location.state;
    console.log("location state: ", locationState);
    
    const userName = locationState.name;
    console.log("userName in Dashboard: ", userName);

    return (
        <React.Fragment>
            <InnerHeader userName = {userName} />
            <Navbar />            
        </React.Fragment>
    );    
}

export default Dashboard;