import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'
import CourtDetails from './CourtDetails';


class Court extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courtType: '',
            areaName: '',
            pincode: '',
            isSearchCourt: props.isSearchCourt,
            isUpdateCourt: props.isUpdateCourt,
            errorMessage: '',
            displayCourtDetails: false,
            listOfCourtDetails: [],
            successMessage: ''
        }
    }

    render() {
        const { courtType, areaName, pincode, isSearchCourt, isUpdateCourt, errorMessage, displayCourtDetails, listOfCourtDetails, successMessage } = this.state;

        return (
            <>
                {
                    isSearchCourt ?
                        <div className='inner-dashboard-container'>
                            <div className='inner-header-container'>
                                <h1>Search Court</h1>
                            </div>
                            <input type="text" value={areaName} id="search-text" placeholder="Search court by Area" onChange={(event) => this.handleChange(event, 'areaName')}></input>
                            <input type="text" value={pincode} id="search-text" placeholder="Search court by pincode" onChange={(event) => this.handleChange(event, 'pincode')}></input>
                            {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                            <div className='law-search-submit-cntr'>
                                <button type='submit' onClick={this.searchCourt} >
                                    Submit
                                </button>
                            </div>
                        </div>
                        :
                        isUpdateCourt ?
                            <div className='inner-dashboard-container'>
                                <div className='inner-header-container'>
                                    <h1>Update Court Details</h1>
                                </div>
                                <input type="text" value={courtType} id="search-text" placeholder="Enter Court Type" onChange={(event) => this.handleChange(event, 'courtType')}></input>
                                <input type="text" value={areaName} id="search-text" placeholder="City" onChange={(event) => this.handleChange(event, 'areaName')}></input>
                                <input type="text" value={pincode} id="search-text" placeholder="Pincode" onChange={(event) => this.handleChange(event, 'pincode')}></input>
                                {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                                {successMessage && <div className="success-msg"> {successMessage} </div>}
                                <div className='law-search-submit-cntr'>
                                    <button type='submit' onClick={this.updateCourt} >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            : <></>
                }

                <div className='inner-dashboard-container'>
                    {
                        displayCourtDetails ?
                            <>
                                <CourtDetails listOfCourtDetails={listOfCourtDetails} />
                                <div className='law-search-cancelbtn-cntr'>
                                    <button type="button" id="law-search-cancelbtn" onClick={this.closeCourtDetailsSection} >Close</button>
                                </div>
                            </>
                            : <></>
                    }
                </div>
            </>
        )
    }

    closeCourtDetailsSection = () => {
        this.setState({
            displayCourtDetails: false,
            listOfCourtDetails: []
        });
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: '',
            successMessage: ''
        });
    }

    searchCourt = () => {
        const { areaName, pincode } = this.state;
        console.log("input state : ", areaName, pincode);
        if (!areaName && !pincode) {
            this.setState({
                errorMessage: 'Invalid Input',
                displayCourtDetails: false
            });
            return;
        }
        const request = {
            area: areaName,
            pincode: pincode
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.FETCH_COURT_BY_AREA;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const courtData = result.data;
            console.log(" lawData : ", courtData.courts);
            if (courtData.statusCode !== 200) {
                var errMsg = 'Court details not found for the given input';
                if (courtData.message != null) {
                    errMsg = courtData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    displayCourtDetails: false,
                    listOfCourtDetails: []
                });
            } else {
                this.setState({
                    errorMessage: '',
                    displayCourtDetails: true,
                    listOfCourtDetails: courtData.courts
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch Court details.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg,
                displayCourtDetails: false
            });
        });
    }

    updateCourt = () => {
        this.setState({
            errorMessage: '',
            successMessage: ''
        });
        const { courtType, areaName, pincode } = this.state;
        console.log("input state : ", courtType, areaName, pincode);
        if (!courtType || !areaName || !pincode) {
            this.setState({
                errorMessage: 'Invalid Input'
            });
            return;
        }
        const request = {
            court_type: courtType,
            area: areaName,
            pincode: pincode
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.UPDATE_COURT_DETAILS;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            console.log(" resultData : ", resultData);
            if (resultData.statusCode !== 201 && resultData.statusCode !== 200) {
                var errMsg = 'Failed to update Court details.';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg
                });
            } else {
                var successMsg = 'Court details persisted successfully';
                if (resultData.message != null) {
                    successMsg = resultData.message;
                }
                this.setState({
                    errorMessage: '',
                    successMessage: successMsg,
                    courtType: '',
                    areaName: '',
                    pincode: ''
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to update Court details.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg
            });
        });
    }

}

export default Court;