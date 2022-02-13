import { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

import * as CommonConstants from '../Constants/CommonConstants.js'
import '../Styles/home.css';
import '../Styles/login.css';
import UserIcon from '../Images/User-Icon.png';
import Loading from '../Images/Loading.gif';

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
            Age: '',
            Address: '',
            City: '',
            Pincode: '',
            Expertize: '',
            isSignInFormOpen: false,
            isSignUpFormOpen: false,
            expertizeId: 'expertizeHide',
            userDetails: {},
            errorMessage: '',
            successMessage: '',
            toRedirect: false,
            loadImage: false
        }
    }

    render() {
        const { Name, Email, Password, Mobile, Age, Address, City, Pincode, Expertize, isSignInFormOpen, isSignUpFormOpen, expertizeId, userDetails, errorMessage, successMessage, toRedirect, loadImage } = this.state;

        return (
            <>
                <div className="container">
                    <span className='logo'>
                        <p>Truth Alone Triumphs</p>   
                    </span>
                    <div className="sign_container">
                        <span className="signspan" id="login" onClick={this.loginOpenHandler}>LOGIN</span>
                        <span className="signspan" id="signup" onClick={this.signUpOpenHandler}>SIGN UP</span>
                    </div>                
                </div>

                <Modal isOpen={isSignInFormOpen} style={customStyle} ariaHideApp={false}>
                    <div className="form-container" >
                        <div className="imgcontainer">
                            <img src={UserIcon} alt='Not found' className="user-icon" />
                            <h1>Login</h1>
                        </div>
                        <div className="login-container">
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <button type="submit" onClick={this.signInHandler} >Login</button>
                            {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                        </div>
                        <div className="login-container">
                            <button type="button" className="cancelbtn" onClick={this.signInCancelHandler}>Cancel</button>
                            {/* <span className="psw"><a href="#">Forgot Password?</a></span> */}
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={toRedirect} ariaHideApp={false} >
                    <Navigate to="/dashboard" replace={true} state={userDetails} />
                </Modal>

                <Modal isOpen={isSignUpFormOpen} style={customStyle} ariaHideApp={false}>
                    <div className="form-container">
                        <div className="imgcontainer">
                            <img src={UserIcon} className="user-icon" alt='Not Found' />
                            <h1>Sign Up</h1>
                        </div>
                        <div className="error-msg"> All Fields are Mandatory </div>
                        <form action="#" className="login-container">
                            <label><b>Name</b></label>
                            <input type="text" value={Name} placeholder="Enter Full Name" onChange={(event) => this.handleChange(event, 'Name')} required />
                            <label><b>Email</b></label>
                            <input type="text" value={Email} placeholder="Enter Email" onChange={(event) => this.handleChange(event, 'Email')} required />
                            <label><b>Password</b></label>
                            <input type="password" value={Password} placeholder="Enter Password" onChange={(event) => this.handleChange(event, 'Password')} required />
                            <label><b>Mobile No.</b></label>
                            <input type="text" value={Mobile} placeholder="Enter Mobile No." onChange={(event) => this.handleChange(event, 'Mobile')} required />
                            <label><b>Role</b></label>
                            <select onChange={(event) => this.handleChangeForRole(event, 'Role')} required >
                                <option value="">Select Role</option>
                                <option value="Public">Public</option>
                                <option value="Lawyer">Lawyer</option>
                            </select>
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
                            <button type="submit" onClick={this.signUpHandler}>Sign Up</button>
                            {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                            {successMessage && <div className="success-msg"> {successMessage} </div>}
                        </form>
                        <div className="login-container">
                            <button type="button" className="cancelbtn" onClick={this.signUpCancelHandler}>Cancel</button>
                        </div>
                    </div>
                </Modal>


                <Modal isOpen={loadImage} style={customStyle} ariaHideApp={false}>
                    
                    <center><img id='loading-icon' src={Loading} alt="Loading..." /> </center>
                </Modal>
            </>
        );
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: ''
        });
    }

    handleChangeForRole = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
        if (event.target.value === 'Lawyer') {
            this.setState({
                expertizeId: 'expertizeShow'
            });
        }
        if (event.target.value !== 'Lawyer') {
            this.setState({
                expertizeId: 'expertizeHide'
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
            isSignInFormOpen: false,
            errorMessage: '',
            loadImage: false
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
            expertizeId: 'expertizeHide',
            successMessage: '',
            errorMessage: '',
            loadImage: false
        });
    }

    signInHandler = () => {
        console.log("signInHandler begins");
        const { Email, Password } = this.state;
        this.setState({
            errorMessage: '',
            successMessage: '',
            loadImage: true
        });
        if (!Email || !Password) {
            console.log("User credentials are missing");
            this.setState({
                errorMessage: 'Invalid Credentials'
            });
            return;
        }
        const request = {
            email: Email,
            password: Password
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.LOGIN_USER;
        console.log("Login User url : ", url);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const userData = result.data;
            if (userData.statusCode !== 200) {
                console.log("Login failed for ", userData.name);
                var errMsg = 'Login Failed';
                if (userData.message != null) {
                    errMsg = userData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    loadImage: false
                });
            } else {
                console.log("Login success for ", userData.name);
                const uDet = {
                    email: userData.email,
                    name: userData.name,
                    userId: userData.userId,
                    role: userData.role,
                    userToken: userData.token
                }
                localStorage.setItem(CommonConstants.USER_NAME, userData.name);
                localStorage.setItem(CommonConstants.USER_ROLE, userData.role);
                localStorage.setItem(CommonConstants.USER_EMAIL, userData.email);
                localStorage.setItem(CommonConstants.USER_ID, userData.userId);
                this.setState({
                    userToken: userData.token,
                    userDetails: uDet,
                    errorMessage: '',
                    Email: '',
                    Password: '',
                    toRedirect: true,
                    loadImage: false
                });
                this.signInCancelHandler();
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Login Failed. Please check your credentials. ';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg,
                loadImage: false
            });
        });
    }

    signUpHandler = () => {
        console.log("signUpHandler begins");
        this.setState({
            errorMessage: '',
            successMessage: '',
            // loadImage: true
        });
        const { Name, Email, Password, Mobile, Role, Age, Address, City, Pincode, Expertize } = this.state;
        if (!Name || !Email || !Password || !Mobile || !Role || !Age || !Address || !City || !Pincode) {
            console.log("Mandatory fields are missing");
            this.setState({
                errorMessage: 'Mandatory fields are missing',
                // loadImage: false
            });
            return;
        }
        const request = {
            email: Email,
            password: Password,
            name: Name,
            mobile_no: Mobile,
            role: Role,
            age: Age,
            address: Address,
            city: City,
            pincode: Pincode,
            expertize: Expertize
        }        
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.REGISTER_USER;
        console.log("Register User url : ", url);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            if (resultData.statusCode !== 201 && resultData.statusCode !== 200) {
                var errMsg = 'Registration Failed';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    loadImage: false
                });
            } else {
                this.setState({
                    errorMessage: '',
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
                    successMessage: 'User Registered successfully',
                    // loadImage: false
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Registration Failed. ';
            if (errData != null && errData.message != null) {
                console.log("errData in catch ", errData.message);
                errMsg = errData.message;
            }
            this.setState({
                errorMessage: errMsg,
                loadImage: false
            });
        });
    }
}


export default Header;