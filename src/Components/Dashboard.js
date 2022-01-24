import React, { Component } from 'react';

import '../Styles/home.css';
import InnerHeader from '../Components/InnerHeader'
import Navbar from '../Components/Navbar'

class Dashboard extends Component {

    constructor(props){
        super(props);
        console.log("prop value in Dashboard ", props);
    }

    render() {
        console.log("inside Dashboard.js");
        return (
            <React.Fragment>
                <InnerHeader />
                <Navbar />
            </React.Fragment>
        );
    }
}

export default Dashboard;