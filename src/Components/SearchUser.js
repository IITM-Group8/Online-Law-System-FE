import React, { Component } from 'react';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';
import 'react-responsive-select/dist/react-responsive-select.css';
import axios from 'axios';

import '../Styles/dashboardbody.css';
import * as CommonConstants from '../Constants/CommonConstants.js'
import UserDetailsView from './UserDetailsView';

class SearchUser extends Component {

    constructor(props) {
        console.log("SearchUser initialized ");
        super(props);
        this.state = {
            Role: '',
            Status: '',
            errorMessage: '',
            listOfUserDetails: undefined,
            searchSection: props.searchSection,
            displayUserDetails: props.displayUserDetails,
            shouldAllowComponentToUpdate: true
        }
    }

    componentDidMount(){
        
    }
   
    render() {
        const { errorMessage, searchSection, displayUserDetails, listOfUserDetails } = this.state;
        console.log("render with state ", this.state);      
        return (
            <>
                {
                    searchSection ?
                        <div className='search-container'>
                            <div className='search-user-title'>
                                <h1>Search User</h1>
                            </div>
                            <div className='dashboard-form-container' >
                                <span className='dashboard-select'>
                                    <Select
                                        name="role"
                                        modalCloseButton={<ModalCloseButton />}
                                        options={[
                                            { value: '', text: 'Select User Role' },
                                            { value: 'Public', text: 'Public' },
                                            { value: 'Lawyer', text: 'Lawyer' }
                                        ]}
                                        caretIcon={<CaretIcon />}
                                        onChange={(event) => this.handleChange(event, 'Role')}
                                        required
                                    />
                                </span>
                                <span className='dashboard-select'>
                                    <Select
                                        name="status"
                                        modalCloseButton={<ModalCloseButton />}
                                        options={[
                                            { value: '', text: 'Select User Status' },
                                            { value: 'New', text: 'New' },
                                            { value: 'Active', text: 'Active' },
                                            { value: 'InActive', text: 'InActive' }
                                        ]}
                                        caretIcon={<CaretIcon />}
                                        onChange={(event) => this.handleChange(event, 'Status')}
                                    />
                                </span>
                                <button type='submit' onClick={this.searchUser} >
                                    Submit
                                </button>
                                {errorMessage && <div className="error-msg"> {errorMessage} </div>}
                            </div>
                        </div> :
                        <></>
                }

                {
                    displayUserDetails ?
                    <UserDetailsView listOfUserDetails = {listOfUserDetails} />                        
                        : <></>
                }

            </>
        );
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.value,
            errorMessage: ''
        });
    }

    searchUser = () => {
        console.log("searchUser begins");
        const { Role, Status } = this.state;
        if (!Role || !Status) {
            console.log("Needed details are missing");
            this.setState({
                errorMessage: 'Please select User Role and Status'
            });
            return;
        }
        const endpoint = CommonConstants.FETCH_USERS_BY_ROLE + Role + "/" + Status;
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + endpoint;
        console.log("Get User url : ", url);
        axios({
            method: CommonConstants.GET,
            url: url,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            const userData = result.data;
            if (userData.statusCode !== 200) {
                console.log("Falied to fetch user details ");
                var errMsg = 'User Details Not Found';
                if (userData.message != null) {
                    errMsg = userData.message;
                }
                this.setState({
                    errorMessage: errMsg
                });
            } else {
                console.log("User details found ");
                this.setState({
                    listOfUserDetails: userData.userDetails,
                    searchSection: false,
                    displayUserDetails: true,
                    errorMessage: '',
                    Role: '',
                    Status: '',
                    shouldAllowComponentToUpdate: false
                });
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to fetch User details.';
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


export default SearchUser;