import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'
import IPCLawDetails from './IPCLawDetails.js';


class IPCLaw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IPCSectionNo: '',
            IPCSectionKey: '',
            errorMessage: '',
            displayIPCLawDetails: false,
            listOfIPCDetails: []
        }
    }

    render() {
        const { IPCSectionNo, IPCSectionKey, errorMessage, displayIPCLawDetails, listOfIPCDetails } = this.state;

        return (
            <>
            <div className='search-ipclaw-container'>
                <input type="text" value={IPCSectionNo} id="ipc-section" placeholder="Search for IPC Section No." onChange={(event) => this.handleChange(event, 'IPCSectionNo')}></input>
                <input type="text" value={IPCSectionKey} id="ipc-section-key" placeholder="Search with some Keys" onChange={(event) => this.handleChange(event, 'IPCSectionKey')}></input>
                {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                <div className='law-search-submit-cntr'>
                <button type='submit' id="law-search-submit" onClick={this.searchIPCLaw} >
                    Submit
                </button>
                </div>
            </div>
            <div className='search-ipclaw-container'>
            {
                displayIPCLawDetails ?
                    <>
                        <IPCLawDetails listOfIPCDetails={listOfIPCDetails} />
                        <div className='law-search-cancelbtn-cntr'>
                        <button type="button" id="law-search-cancelbtn" onClick={this.closeLawDetailsSection} >Close</button>
                        </div>
                    </>
                    : <></>
            }
            </div>
            </>
        )
    }

    closeLawDetailsSection = () => {
        this.setState({
            displayIPCLawDetails: false
        });
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: ''
        });
    }

    searchIPCLaw = () => {
        const { IPCSectionNo, IPCSectionKey } = this.state;
        console.log("input state : ", IPCSectionNo, IPCSectionKey);
        if (!IPCSectionNo && !IPCSectionKey) {
            this.setState({
                errorMessage: 'Invalid Input',
                displayIPCLawDetails: false
            });
            return;
        }
        const request = {
            section_no: IPCSectionNo,
            description: IPCSectionKey
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.FETCH_IPC_LAWS;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const lawData = result.data;
            console.log(" lawData : ", lawData.laws);
            if (lawData.statusCode !== 200) {
                var errMsg = 'IPC Law details not found for the given input';
                if (lawData.message != null) {
                    errMsg = lawData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    displayIPCLawDetails: false,
                    listOfIPCDetails: []
                });
            } else {
                this.setState({
                    errorMessage: '',
                    displayIPCLawDetails: true,
                    listOfIPCDetails: lawData.laws
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch IPC Law details.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg,
                displayIPCLawDetails: false
            });
        });
    }

}

export default IPCLaw;