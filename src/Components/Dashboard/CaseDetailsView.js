import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from '@mui/material';

import multiDownload from 'multi-download';
import Base64 from 'react-native-base64'

import * as FaIcons from 'react-icons/fa';

import '../../Styles/dashboardbody.css';
import * as CommonConstants from '../../Constants/CommonConstants.js'

var columns = [
    { id: 'ipcSection', label: 'IPC Section', minWidth: 100 },
    { id: 'caseDescription', label: 'Description', minWidth: 150 },
    { id: 'caseStatus', label: 'Status', minWidth: 100 },
    { id: 'createdDate', label: 'Filed Date', minWidth: 100 },
    { id: 'caseFiles', label: 'Case Files', minWidth: 100 }
];

const userRole = localStorage.getItem(CommonConstants.USER_ROLE);
if (userRole === 'Lawyer') {
    columns.push({ id: 'updateCase', label: 'Update Case', minWidth: 100 });
}

function CaseDetailsView(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [noOfRowsPerPage, setNoOfRowsPerPage] = React.useState([]);
    const updateNoOfRows = (noOfRows) => {
        if (noOfRows >= 100) {
            setNoOfRowsPerPage([10, 25, 50, 100])
        } else if (noOfRows >= 50) {
            setNoOfRowsPerPage([10, 25, 50])
        } else if (noOfRows >= 25) {
            setNoOfRowsPerPage([10, 25])
        } else if (noOfRows >= 10) {
            setNoOfRowsPerPage([10])
        }
    }

    var [rows, setRows] = React.useState([]);
    if (rows.length === 0) {
        setRows(props.listOfCaseDetails);
        updateNoOfRows(rows.length);
    }

    const updateRows = (caseDetailsList, caseId, caseStatus) => {
        console.log("updateRows : ", caseId, caseStatus, caseDetailsList);
        for (let val of caseDetailsList) {
            if (val.id === caseId) {
                console.log("ating case satus: ", caseId, val.caseStatus);
                val.caseStatus = caseStatus;
                setRows(caseDetailsList);
                console.log("after rows: ", rows);
            }
        }
    }

    const downloadFiles = (files) => {
        var downloadedFiles = [];
        for (let caseFiles of files) {
            
            //TODO:
            //Currently supporting only text file. Yet to do for the other types of files.

            // let buff = new Buffer(caseFiles.file, 'base64');
            // let buff = Buffer.from(caseFiles.file, 'base64');
            // console.log("caseFiles.file ", buff);
            let decode = Base64.decode(caseFiles.file);
            // let decode = (String.fromCharCode(...new Uint8Array(caseFiles.file)));
            const finalFile = URL.createObjectURL(new Blob([decode], { type: caseFiles.contentType }));
            downloadedFiles.push(finalFile);
        }
        multiDownload(downloadedFiles);
    }

    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    const updateSuccessMessage = (successMsg) => {
        if (successMessage !== successMsg) {
            setSuccessMessage(successMsg);
        }
    }

    const updateErrorMessage = (errMsg) => {
        if (errorMessage !== errMsg) {
            setErrorMessage(errMsg);
        }
    }

    const updateCaseStatus = (caseId, caseStatus) => {
        console.log("updateCaseStatus begins for : ", caseId, caseStatus);
        const request = {
            caseId: caseId,
            caseStatus: caseStatus
        }
        updateSuccessMessage('');
        updateErrorMessage('');
        const url = CommonConstants.ONLINE_LAW_SYSTEM_MS_HOST + CommonConstants.ONLINE_LAW_SYSTEM_MS_PORT + CommonConstants.UPDATE_CASE_STATUS;
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
                var succMsg = 'Case status updated successfully.';
                if (resultData.message != null) {
                    succMsg = resultData.message;
                }
                updateRows(rows, caseId, caseStatus);
                updateSuccessMessage(succMsg);
                updateErrorMessage('');
            }
        }).catch(error => {
            const errData = error.response.data;
            let errMsg = 'Failed to update Case status.';
            if (!errData.message) {
                errMsg = errData.message;
            }
            updateErrorMessage(errMsg);
            updateSuccessMessage('');
        });
    };

    return (
        <div className='search-container' id='law-search-container' >
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
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <>
                                                        {
                                                            column.id === 'caseFiles' ?

                                                                row.caseFiles
                                                                    && row.caseFiles.length > 0 ?
                                                                    <label id='update-user-status' onClick={() => downloadFiles(row.caseFiles)}>
                                                                        <FaIcons.FaFileDownload id='case-files' />
                                                                        Download All
                                                                    </label>
                                                                    :
                                                                    <label id='update-user-status' >
                                                                        N/A
                                                                    </label>

                                                                :
                                                                column.id === 'updateCase' ?
                                                                    <>
                                                                        {
                                                                            row['caseStatus'] === 'New' ?
                                                                                <label id='update-user-status' >
                                                                                    <Link to="#" align={column.align} onClick={() => updateCaseStatus(row.id, 'Accepted')}>
                                                                                        Accept
                                                                                    </Link>
                                                                                    |
                                                                                    <Link to="#" align={column.align} onClick={() => updateCaseStatus(row.id, 'Rejected')}>
                                                                                        Reject
                                                                                    </Link>
                                                                                </label>
                                                                                :
                                                                                row['caseStatus'] === 'Accepted' ?
                                                                                    <label id='update-user-status' >
                                                                                        <Link to="#" align={column.align} onClick={() => updateCaseStatus(row.id, 'Filed To Court')}>
                                                                                            Submit To Court
                                                                                        </Link>
                                                                                    </label>
                                                                                    :
                                                                                    <label id='update-user-status' >
                                                                                        <span>{row['caseStatus']}</span>
                                                                                    </label>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value}
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
    );
}

export default CaseDetailsView;