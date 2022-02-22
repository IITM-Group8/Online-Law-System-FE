import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'
import ReportDetailsView from './ReportDetailsView';


class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ipcSection: '',
            fromYear: '',
            toYear: '',
            displayReport: false,
            errorMessage: '',
            listOfReports: undefined
        }
    }

    render() {
        const { ipcSection, fromYear, toYear, errorMessage, displayReport, listOfReports } = this.state;

        return (
            <>
                <div className='inner-header-container'>
                    <h1>Report Details</h1>
                </div>
                <div className='inner-dashboard-container'>
                    <input type="text" value={ipcSection} id="search-text" placeholder="IPC Section" onChange={(event) => this.handleChange(event, 'ipcSection')}></input>
                    <input type="text" value={fromYear} id="search-text" placeholder="From Year" onChange={(event) => this.handleChange(event, 'fromYear')}></input>
                    <input type="text" value={toYear} id="search-text" placeholder="To Year" onChange={(event) => this.handleChange(event, 'toYear')}></input>
                    {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                    <div className='law-search-submit-cntr'>
                        <button type='submit' onClick={this.generateReport} >
                            Submit
                        </button>
                    </div>
                </div>


                {
                    displayReport ?
                        <div className='inner-dashboard-container'>
                            <ReportDetailsView listOfReports={listOfReports} />
                        </div>
                        : <></>
                }
            </>
        )
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: ''
        });
    }

    generateReport = () => {
        const { ipcSection, fromYear, toYear } = this.state;
        console.log("generateReport input state : ", ipcSection, fromYear, toYear);
        this.setState({
            errorMessage: '',
            displayReport: false,
            listOfReports: []
        });
        if (!ipcSection && !fromYear && !toYear) {
            this.setState({
                errorMessage: 'Invalid Input',
                displayReport: false
            });
            return;
        }
        const request = {
            ipcSection: ipcSection,
            fromYear: fromYear,
            toYear: toYear
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.GENERATE_REPORTS;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            console.log(" resultData : ", resultData);
            if (resultData.statusCode !== 200) {
                var errMsg = 'Reports are empty for the given input';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    displayReport: false,
                    listOfReports: []
                });
            } else {
                this.setState({
                    errorMessage: '',
                    displayReport: true,
                    listOfReports: resultData.reports
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch reports.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg,
                displayReport: false
            });
        });
    }

}

export default Report;