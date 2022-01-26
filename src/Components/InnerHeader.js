import { Component } from 'react';

import * as FiIcons from 'react-icons/fi';
import * as RiIcons from 'react-icons/ri';

import '../Styles/innerheader.css';
import LawLogo from '../Images/law_logo3.jpg';
import UserIcon from '../Images/User-Icon.png';
import DownArrow from '../Images/expand-down-arrow.png';


class InnerHeader extends Component {

    constructor(props) {
        super(props);
        console.log("User name in Inner header: ", props.name);
        this.state = {
            userName: props.name
        }
    }

    render() {
        const { userName } = this.state;
        return (
            <>
                <div className="inner-header-container">
                    <div className="user-container">
                        <span className="user-name">
                            <FiIcons.FiUser /> {userName}
                            <RiIcons.RiArrowDropDownLine />
                        </span>
                    </div>
                    <div className="logo">
                        <img src= {LawLogo} alt='Not Found' />
                    </div>
                </div>

            </>
        );
    }


}

export default InnerHeader;