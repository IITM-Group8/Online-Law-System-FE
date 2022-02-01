import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'


class Court extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearchCourt: props.isSearchCourt,
            isUpdateCourt: props.isUpdateCourt
        }
    }

    render() {
        const { isSearchCourt, isUpdateCourt } = this.state;

        return (
            <>
                {
                    isSearchCourt ?
                        <div className='inner-dashboard-container'>
                           
                        </div>
                        : <></>
                }
                
                {
                    isUpdateCourt ?
                        <div className='inner-dashboard-container'>
                           Hi
                        </div>
                        : <></>
                }

                

            </>
        )
    }

    
}

export default Court;