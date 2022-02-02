import * as React from 'react';
import axios from 'axios';
import { Link } from '@mui/material';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'mobile_no', label: 'Mobile No.', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100 },
    { id: 'age', label: 'Age', minWidth: 10 },
    {
        id: 'address',
        label: 'Address',
        minWidth: 150
    },
    { id: 'city', label: 'City', minWidth: 120 },
    { id: 'pincode', label: 'Pinocde', minWidth: 100 },
    { id: 'expertize', label: 'Expertize', minWidth: 100 },
    { id: 'user_status', label: 'User Status', minWidth: 100 },
    { id: 'update_user', label: 'Update User', minWidth: 100 }
];

function UserDetailsView(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const rows = props.listOfUserDetails;
    const [noOfRowsPerPage, setNoOfRowsPerPage] = React.useState([]);
    const updateNoOfRows = (noOfRows) => {
        if(noOfRows >= 100){
            setNoOfRowsPerPage([10, 25, 50, 100])
        }else if(noOfRows >= 50){
            setNoOfRowsPerPage([10, 25, 50])
        }else if(noOfRows >= 25){
            setNoOfRowsPerPage([10, 25])
        }else if(noOfRows >= 10){
            setNoOfRowsPerPage([10])
        }
    }

    var [rows, setRows] = React.useState([]);
    if(rows.length === 0){
        setRows(props.listOfUserDetails);
        updateNoOfRows(rows.length);
    }   
        
    const updateRows = (userDetailsList, userId) =>{
        for(let val of userDetailsList){
            if(val.id === userId){
                userDetailsList.pop(val.id);
                setRows(userDetailsList);
                updateNoOfRows(userDetailsList.length);
            }            
        }
    }

    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const updateSuccessMessage = (successMsg) => {
        if(successMessage !== successMsg){
            setSuccessMessage(successMsg);
        }
    }

    const updateErrorMessage = (errMsg) => {
        if(errorMessage !== errMsg){
            setErrorMessage(errMsg);
        }
    }

    const updateUserStatus = (userId, user_status) => {
        console.log("updateUserStatus begins for : ", userId, user_status);
        const request = {
            id: userId,
            user_status: user_status
        }        
        updateSuccessMessage('');
        updateErrorMessage('');
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.UPDATE_USER_STATUS;
        console.log("request ", request);
        axios({
            method: CommonConstants.PUT,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: request,
        }).then(result => {
            const resultData = result.data;
            console.log(" resultData : ", resultData);
            if (resultData.statusCode !== 201 && resultData.statusCode !== 200) {
                var errMsg = 'Failed to update User Status';
                if (resultData.message != null) {
                    errMsg = resultData.message;
                }
                updateErrorMessage(errMsg);
                updateSuccessMessage('');
            } else {
                updateRows(rows, userId);
                updateSuccessMessage('User status updated successfully.');
                updateErrorMessage('');                
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to update User status.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            updateErrorMessage(errMsg);
            updateSuccessMessage('');
        });
    };

    return (
        <>
        <div className='paper-container'  >            
        {errorMessage && <div className="error-msg"> {errorMessage} </div>}
            {successMessage && <div className="success-msg"> {successMessage} </div>}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                console.log("check after update rows : ", rows);
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <>
                                                {
                                                    column.id === 'update_user' ?
                                                    <label id='update-user-status'>
                                                    <Link to = "#" align={column.align} onClick={() => updateUserStatus(row.id, row.update_user)}>
                                                        {value}
                                                    </Link>
                                                    </label>
                                                    :
                                                    <TableCell key={column.id} align={column.align}>
                                                    {
                                                    column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value
                                                        }
                                                </TableCell>
                                                }
                                                
                                                </>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={noOfRowsPerPage}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
        </>
    );
}

export default UserDetailsView;