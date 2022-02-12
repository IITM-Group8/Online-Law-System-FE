import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'
import CourtDetails from './CourtDetails';


class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ipcSection: '',
            fromYear: '',
            toYear: '',
            displayReport: false,
            errorMessage: '',
            successMessage: ''
        }
    }

    render() {
        const { ipcSection, fromYear, toYear, errorMessage, successMessage, displayReport } = this.state;

        return (
            <>
                <div className='inner-dashboard-container'>
                    <input type="text" value={ipcSection} id="search-text" placeholder="IPC Section" onChange={(event) => this.handleChange(event, 'ipcSection')}></input>
                    <input type="text" value={fromYear} id="search-text" placeholder="Start Year" onChange={(event) => this.handleChange(event, 'fromYear')}></input>
                    <input type="text" value={toYear} id="search-text" placeholder="To Year" onChange={(event) => this.handleChange(event, 'toYear')}></input>
                    {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                    <div className='law-search-submit-cntr'>
                        <button type='submit' onClick={this.generateReport} >
                            Submit
                        </button>
                    </div>
                </div>

                <div className='inner-dashboard-container'>
                    {
                        displayReport ?
                            <>
                                Work In Progress
                            </>
                            : <></>
                    }
                </div>
            </>
        )
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: '',
            successMessage: ''
        });
    }

    generateReport = () => {
        //TODO
        this.setState({
            displayReport: true
        });
    }

}

export default Report;