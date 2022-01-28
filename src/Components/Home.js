import React, { Component } from 'react';

import '../Styles/home.css';
import Header from "../Components/Header";

class Home extends Component {
    render() {
        console.log("inside Home.js");
        return (
            <React.Fragment>
                <Header />               
                <div className="body_container">
                    <div className="justice_logo" id='justice_logo'></div>
                    <span className="body_description">The objective of this Act is to provide a general penal code for India. Though not the initial objective, the Act does not repeal the penal laws which were in force at the time of coming into force in India.This was done because the Code does not contain all the offences and it was possible that some offences might have still been left out of the Code, which were not intended to be exempted from penal consequences. Though this Code consolidates the whole of the law on the subject and is exhaustive on the matters in respect of which it declares the law, many more penal statutes governing various offences have been created in addition to the code.</span>
                </div>
                <div>
        
        </div>
            </React.Fragment>
        );
    }
}

export default Home;