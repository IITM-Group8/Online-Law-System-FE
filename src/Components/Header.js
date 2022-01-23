import { Component } from 'react';
import Modal from 'react-modal';

import '../Styles/home.css';
import '../Styles/login.css';
import LawLogo from '../Images/law_logo3.jpg';
import UserIcon from '../Images/User-Icon.png';

const customStyle = {
    content: {
        backgroundColor: '',
        border: ''
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            Name: '',
            Email: '',
            Password: '',
            Mobile: '',
            Role: '',
            Age: '',
            Address: '',
            City: '',
            Pincode: '',
            Expertize: '',
            isSignInFormOpen: false,
            isSignUpFormOpen: false,
            expertizeId: 'expertizeHide'            
        }
    }

    render() {
        const { Name, Email, Password, Mobile, Role, Age, Address, City, Pincode, Expertize, isSignInFormOpen, isSignUpFormOpen, expertizeId } = this.state;
        return (
            <>
                <div class="container">
                    <div class="sign_container">
                        <span class="signspan" id="login" onClick={this.loginOpenHandler}>LOGIN</span>
                        <span class="signspan" id="signup" onClick={this.signUpOpenHandler}>SIGN UP</span>
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

                <Modal isOpen={isSignInFormOpen} style={customStyle} ariaHideApp={false}>
                    <form action="#">
                        <div class="imgcontainer">
                            <img src={UserIcon} class="user-icon" />
                            <h1>Login</h1>
                        </div>
                        <div class="login-container">
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <button type="submit">Login</button>
                        </div>
                        <div class="login-container">
                            <button type="button" class="cancelbtn" onClick={this.signInCancelHandler}>Cancel</button>
                            <span class="psw"><a href="#">Forgot Password?</a></span>
                        </div>
                    </form>
                </Modal>

                <Modal isOpen={isSignUpFormOpen} style={customStyle} ariaHideApp={false}>
                    <form action="#">
                        <div class="imgcontainer">
                            <img src={UserIcon} class="user-icon" />
                            <h1>Sign Up</h1>
                        </div>
                        <div class="login-container">
                            <label><b>Name</b></label>
                            <input type="text" value={Name} placeholder="Enter Full Name" onChange={(event) => this.handleChange(event, 'Name')} required />
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <label><b>Mobile No.</b></label>
                            <input type="text" value={Mobile} placeholder="Enter Mobile No." onChange={(event) => this.handleChange(event, 'Mobile')} required />
                            <label><b>Role</b></label>
                            <input type="text" value={Role} placeholder="Enter Role" onChange={(event) => this.handleChangeForRole(event, 'Role')} required />
                            <label><b>Age</b></label>
                            <input type="text" value={Age} placeholder="Enter Age" onChange={(event) => this.handleChange(event, 'Age')} required />
                            <label><b>Address</b></label>
                            <input type="text" value={Address} placeholder="Enter Full Address" onChange={(event) => this.handleChange(event, 'Address')} required />
                            <label><b>City</b></label>
                            <input type="text" value={City} placeholder="Enter City" onChange={(event) => this.handleChange(event, 'City')} required />
                            <label><b>Pincode</b></label>
                            <input type="text" value={Pincode} placeholder="Enter Pincode" onChange={(event) => this.handleChange(event, 'Pincode')} required />
                            <div id={expertizeId}>
                                <label><b>Expertize</b></label>
                                <input type="text" value={Expertize} placeholder="Enter Lawyer's Expertize" onChange={(event) => this.handleChange(event, 'Expertize')} required />
                            </div>
                            <button type="submit">Login</button>
                        </div>
                        <div class="login-container">
                            <button type="button" class="cancelbtn" onClick={this.signUpCancelHandler}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            </>
        );
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
    }

    handleChangeForRole = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
        if (event.target.value == 'Lawyer') {
            this.setState({
                expertizeId: 'expertizeShow'
            });
        }
    }

    loginOpenHandler = () => {
        this.setState({
            isSignInFormOpen: true
        });
    }

    signUpOpenHandler = () => {
        this.setState({
            isSignUpFormOpen: true
        })
    }

    signInCancelHandler = () => {
        this.setState({
            Email: '',
            Password: '',
            isSignInFormOpen: false
        });
    }

    signUpCancelHandler = () => {
        this.setState({
            Name: '',
            Email: '',
            Password: '',
            Mobile: '',
            Role: '',
            Age: '',
            Address: '',
            City: '',
            Pincode: '',
            Expertize: '',
            isSignUpFormOpen: false,
            expertizeId: 'expertizeHide'        
        });
    }
}

export default Header;