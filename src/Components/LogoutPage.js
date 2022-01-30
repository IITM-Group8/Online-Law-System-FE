import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import '../Styles/navbar.css';
import '../Styles/login.css';

class LogoutPage extends Component {

    render() {

        return (
            <>
                <div>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        <div className='navbar'>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="logout-form-container" >
                    You have successfully logged out.<br />
                    <Link to = '/home' replace = {true} className='home-return'>
                        Retrun back to Home Page.
                    </Link>
                </div>
            </>
        );
    }
}



export default LogoutPage;
