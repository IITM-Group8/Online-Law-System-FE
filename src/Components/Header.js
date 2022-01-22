import { Component } from 'react';

import '../Styles/home.css';
import LawLogo from '../Images/law_logo3.jpg';

class Header extends Component {

    render() {
        return (
            <div class="container">
                <div class="sign_container">
                    <span class="signspan" id="login">LOGIN</span>
                    <span class="signspan" id="signup">SIGN UP</span>
                </div>
                <div class="logo">
                    <img src={LawLogo} />
                    <p>Online Law System</p>
                </div>
                <div class="options">
                    <span class="option_span" id="home">Home</span>
                    <span class="option_span" id="aboutus">About Us</span>
                </div>
            </div>
        );
    }
}

export default Header;