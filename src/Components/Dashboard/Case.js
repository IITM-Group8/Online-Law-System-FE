import React, { Component } from 'react';
import axios from 'axios';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'
import LawyerDetailsView from './LawyerDetailsView';
import CaseDetailsView from './CaseDetailsView'

class Case extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem(CommonConstants.USER_ID),
            lawyerId: '',
            ipcSection: '',
            caseDescription: '',
            caseFiles: '',
            isForFileACase: props.isForFileACase,
            isForViewACase: props.isForViewACase,
            errorMessage: '',
            successMessage: '',
            lawyerName: '',
            lawyerExpertize: '',
            searchLawyerErrorMessage: '',
            displayLawyerDetails: false,
            listOfLawyerDetails: [],
            caseStatus: '',
            displayCaseDetails: false,
            listOfCaseDetails: undefined
        }
    }

    render() {
        const { lawyerId, ipcSection, caseDescription, isForFileACase, isForViewACase, errorMessage, successMessage, lawyerName, lawyerExpertize, searchLawyerErrorMessage, displayLawyerDetails, listOfLawyerDetails, displayCaseDetails, listOfCaseDetails } = this.state;
        return (
            <>
                {
                    isForFileACase ?
                        <div className='inner-dashboard-container'>
                            <div className='inner-header-container'>
                                    <h1>File a Case</h1>
                                </div>
                            <input type="text" value={ipcSection} id="search-text" placeholder="Enter IPC Section" onChange={(event) => this.handleChange(event, 'ipcSection')}></input>
                            <div className='single-div'>
                                <input type="text" value={lawyerName} id="search-text" placeholder="Enter Lawyer Name" onChange={(event) => this.handleChange(event, 'lawyerName')}></input>
                                <input type="text" value={lawyerExpertize} id="search-text-side" placeholder="Enter Specilization" onChange={(event) => this.handleChange(event, 'lawyerExpertize')}></input>
                                <div className='law-search-submit-side'>
                                    <button type='submit' onClick={this.searchLawyer} >
                                        Search
                                    </button>
                                </div>
                            </div>
                            {searchLawyerErrorMessage && <div className="error-msg"> {searchLawyerErrorMessage} </div>}
                            {lawyerId && <div className="success-msg"> You have selected a Lawyer </div>}
                            {
                                displayLawyerDetails ?
                                    <div className='lawyer-details-container'>
                                        <LawyerDetailsView listOfLawyerDetails={listOfLawyerDetails} selectLawyer={this.selectLawyer} />
                                        <div className='law-search-cancelbtn-cntr'>
                                            <button type="button" id="law-search-cancelbtn" onClick={this.closeLawyerDetailsSection} >Close</button>
                                        </div>
                                    </div>
                                    : <></>
                            }

                            <input type="file" id="case-files" multiple className='choose-file' placeholder="Enter Lawyer Name" onChange={(event) => this.handleFileChange(event, 'caseFiles')}></input>

                            <textarea name="Enter Description" id="insert-ipc-section-key" placeholder="Description"
                                onChange={(event) => this.handleChange(event, 'caseDescription')} value={caseDescription}></textarea>
                            {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                            {successMessage && <div className="success-msg"> {successMessage} </div>}
                            <div className='law-search-submit-cntr'>
                                <button type='submit' onClick={this.submitCase} >
                                    Submit
                                </button>
                            </div>
                        </div>
                        :
                        isForViewACase ?
                            <div className='search-container'>
                                <div className='search-user-title'>
                                    <h1>Check Case Status</h1>
                                </div>
                                <div className='dashboard-form-container' >
                                    <span className='dashboard-select'>
                                        <Select
                                            name="caseStatus"
                                            modalCloseButton={<ModalCloseButton />}
                                            options={[
                                                { value: '', text: 'Select Case Status' },
                                                { value: 'New', text: 'New' },
                                                { value: 'Accepted', text: 'Accepted' },
                                                { value: 'Rejected', text: 'Rejected' },
                                                { value: 'Filed To Court', text: 'Filed To Court' }
                                            ]}
                                            caretIcon={<CaretIcon />}
                                            onChange={(event) => this.handleChangeSelect(event, 'caseStatus')}
                                            required
                                        />
                                    </span>
                                    <button type='submit' onClick={this.filedCaseStatus} >
                                        Submit
                                    </button>
                                    {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                                </div>
                            </div>
                            : <></>
                }


                {
                    displayCaseDetails ?
                        <div className='inner-dashboard-container'>
                            <CaseDetailsView listOfCaseDetails={listOfCaseDetails} newDetails={true} />
                            <div className='law-search-cancelbtn-cntr'>
                                <button type="button" id="law-search-cancelbtn" onClick={this.closeCaseDetailsSection} >Close</button>
                            </div>
                        </div>
                        : <></>
                }
            </>
        )
    }

    closeCaseDetailsSection = () => {
        this.setState({
            displayCaseDetails: false,
            listOfCaseDetails: []
        });
    }

    closeLawyerDetailsSection = () => {
        this.setState({
            displayLawyerDetails: false,
            listOfLawyerDetails: []
        });
    }

    handleChangeSelect = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.value,
            errorMessage: '',
            successMessage: '',
            listOfCaseDetails: []
        });
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value,
            errorMessage: '',
            successMessage: '',
            searchLawyerErrorMessage: ''
        });
    }

    handleFileChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.files,
            errorMessage: '',
            successMessage: '',
            searchLawyerErrorMessage: ''
        });
    }

    selectLawyer = (selectedLawyerId) => {
        this.setState({
            lawyerId: selectedLawyerId,
            displayLawyerDetails: false,
        });
    }

    searchLawyer = () => {
        const { lawyerName, lawyerExpertize } = this.state;
        console.log("input state : ", lawyerName, lawyerExpertize);
        if (!lawyerName && !lawyerExpertize) {
            this.setState({
                searchLawyerErrorMessage: 'Please Enter Lawyer Name or Specializations',
                displayLawyerDetails: false
            });
            return;
        }
        const request = {
            name: lawyerName,
            expertize: lawyerExpertize
        }
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.FETCH_LAWYER;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            if (resultData.statusCode !== 200) {
                var errMsg = 'Lawyer details not found for the given input';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    searchLawyerErrorMessage: errMsg,
                    displayLawyerDetails: false,
                    listOfLawyerDetails: []
                });
            } else {
                this.setState({
                    searchLawyerErrorMessage: '',
                    displayLawyerDetails: true,
                    listOfLawyerDetails: resultData.lawyerDetails
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch Lawyer details.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                searchLawyerErrorMessage: errMsg,
                displayLawyerDetails: false
            });
        });
    }

    submitCase = () => {
        this.setState({
            errorMessage: '',
            successMessage: ''
        });
        const { userId, lawyerId, ipcSection, caseDescription, caseFiles } = this.state;
        console.log("input state : ", userId, lawyerId, ipcSection);
        if (!userId || !lawyerId || !ipcSection || !caseDescription) {
            this.setState({
                errorMessage: 'Invalid Input'
            });
            return;
        }
        const formData = new FormData();
        formData.append('public_user_id', userId);
        formData.append('lawyer_id', lawyerId);
        formData.append('ipc_section', ipcSection);
        formData.append('case_description', caseDescription);
        for (let i = 0; i < caseFiles.length; i++) {
            formData.append("case_files", caseFiles[i]);
        }

        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.FILE_A_CASE_BY_PUBLIC;

        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: formData,
        }).then(result => {
            const resultData = result.data;
            console.log(" resultData : ", resultData);
            if (resultData.statusCode !== 201 && resultData.statusCode !== 200) {
                var errMsg = 'Failed to File a Case.';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg
                });
            } else {
                var successMsg = 'Case Filed successfully';
                if (resultData.message != null) {
                    successMsg = resultData.message;
                }
                this.setState({
                    errorMessage: '',
                    successMessage: successMsg,
                    lawyerId: '',
                    ipcSection: '',
                    caseDescription: '',
                    lawyerName: '',
                    lawyerExpertize: ''
                });
                document.getElementById("case-files").value = '';
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to File a Case.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg
            });
        });
    }

    filedCaseStatus = () => {
        this.setState({
            errorMessage: '',
            successMessage: '',
            displayCaseDetails: false,
            listOfCaseDetails: []
        });
        const { userId, caseStatus } = this.state;
        console.log("input state to get case ttatus: ", userId, caseStatus);
        if (!userId || !caseStatus) {
            this.setState({
                errorMessage: 'Invalid Input'
            });
            return;
        }
        var request = {};
        const role = localStorage.getItem(CommonConstants.USER_ROLE);
        if (role === 'Public') {
            request = {
                caseStatus: caseStatus,
                publicUserId: userId
            }
        } else if (role === 'Lawyer') {
            request = {
                caseStatus: caseStatus,
                lawyerUserId: userId
            }
        } else {
            this.setState({
                errorMessage: 'Invalid role.'
            });
            return;
        }

        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.VIEW_A_CASE_STATUS;
        console.log("request ", request);
        axios({
            method: CommonConstants.POST,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            if (resultData.statusCode !== 200) {
                var errMsg = 'Case details not found for the given input';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                this.setState({
                    errorMessage: errMsg,
                    displayCaseDetails: false,
                    listOfCaseDetails: []
                });
            } else {
                this.setState({
                    errorMessage: '',
                    displayCaseDetails: true,
                    listOfCaseDetails: resultData.case
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch Case details.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            console.log("response in catch ", errMsg);
            this.setState({
                errorMessage: errMsg,
                displayCaseDetails: false
            });
        });
    }
}

export default Case;