import * as React from 'react';
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
    { id: 'select_user', label: 'Select User', minWidth: 100 }
];

function LawyerDetailsView(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = props.listOfLawyerDetails;
    const [noOfRowsPerPage, setNoOfRowsPerPage] = React.useState([]);
    
    const selectLawyer = props.selectLawyer;
    const selectThisLawyer = (lawyerId) => {
        console.log("selectLawyer begins for : ", lawyerId);
        selectLawyer(lawyerId);
    };

    return (
        <>
        <div className='paper-container'  >                    
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
                                                    column.id === 'select_user' ?
                                                    <label id='update-user-status'>
                                                    <Link to = "#" align={column.align} onClick={() => selectThisLawyer(row.id)}>
                                                        Select
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

export default LawyerDetailsView;