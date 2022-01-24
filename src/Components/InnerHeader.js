import { Component } from 'react';

import '../Styles/innerheader.css';


class InnerHeader extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { } = this.state;
        return (
            <>
                <div class="container">
                    <div class="user-container">
                        <span class="user-name">
                            <img id="user-icon" src="Images/User-Icon.png" /> Amalesh Ramasubbu
                            <img id="expand-down-arrow" src="Images/expand-down-arrow.png" />
                        </span>
                    </div>
                    <div class="logo">
                        <img src="Images/law_logo3.jpg" />
                    </div>
                </div>

            </>
        );
    }


}

export default InnerHeader;