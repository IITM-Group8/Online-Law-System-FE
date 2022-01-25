import React, { Component } from 'react';

import '../Styles/innerheader.css';
import InnerHeader from '../Components/InnerHeader'
import Navbar from '../Components/Navbar'

class Dashboard extends Component {

    constructor(props){
        super(props);
        const userDetails = this.state;
        console.log("prop value in Dashboard ", props.location.state);
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