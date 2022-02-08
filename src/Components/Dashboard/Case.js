import React, { Component } from 'react';
import axios from 'axios';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'

class Case extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicUserId: localStorage.getItem(CommonConstants.USER_ID),
            lawyerId: '',
            ipcSection: '',
            caseDescription: '',
            caseFiles: [],
            isForFileACase: props.isForFileACase,
            isForViewACase: props.isForViewACase,
            errorMessage: '',
            successMessage: ''
        }
    }

    render() {
        const { lawyerId, ipcSection, caseDescription, caseFiles, isForFileACase, isForViewACase, errorMessage, successMessage } = this.state;
        return (
            <>
                {
                    isForFileACase ?
                        <div className='inner-dashboard-container'>
                            <input type="text" value={ipcSection} id="search-text" placeholder="Enter IPC Section" onChange={(event) => this.handleChange(event, 'ipcSection')}></input>
                            <input type="text" value={lawyerId} id="search-text" placeholder="Search court by pincode" onChange={(event) => this.handleChange(event, 'lawyerId')}></input>
                            <textarea name="Enter Description" id="insert-ipc-section-key" placeholder="Description"
                                onChange={(event) => this.handleChange(event, 'caseDescription')} value={caseDescription}></textarea>
                            {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                            <div className='law-search-submit-cntr'>
                                <button type='submit' onClick={this.searchCourt} >
                                    Submit
                                </button>
                            </div>
                        </div>
                        :
                        isForViewACase ?
                            <div className='inner-dashboard-container'>
                                Work In-Progress
                            </div>
                            : <></>
                }
            </>
        )
    }

}

export default Case;