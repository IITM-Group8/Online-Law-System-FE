import { Component } from 'react';

import '../Styles/login.css';
import UserIcon from '../Images/User-Icon.png';

class Login extends Component {

    render() {
        return (
            <div class="login-container">
                <form action="/action_page.php">
                    <div class="imgcontainer">
                        <img src= { UserIcon } alt="Avatar" class="avatar" />
                    </div>
                    <div class="container">
                        <label><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="uname" required />

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                        <button type="submit">Login</button>
                    </div>
                    <div class="container" style="background-color:#f1f1f1">
                        <button type="button" class="cancelbtn">Cancel</button>
                        <span class="psw">Forgot <a href="#">password?</a></span>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;