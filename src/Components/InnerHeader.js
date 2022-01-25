import { Component } from 'react';

import '../Styles/innerheader.css';
import LawLogo from '../Images/law_logo3.jpg';
import UserIcon from '../Images/User-Icon.png';
import DownArrow from '../Images/expand-down-arrow.png';


class InnerHeader extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        // const { } = this.state;
        return (
            <>
                <div class="container">
                    <div class="user-container">
                        <span class="user-name">
                            <img id="user-icon" src= {UserIcon} alt='Not Found' /> Amalesh Ramasubbu
                            <img id="expand-down-arrow" src= {DownArrow} alt='Not Found' />
                        </span>
                    </div>
                    <div class="logo">
                        <img src= {LawLogo} alt='Not Found' />
                    </div>
                </div>

            </>
        );
    }


}

export default InnerHeader;