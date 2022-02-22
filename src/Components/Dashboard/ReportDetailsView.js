import * as React from 'react';
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
    { id: 'ipc_section', label: 'IPC Section', minWidth: 100 },
    { id: 'case_description', label: 'Case Description', minWidth: 100 },
    { id: 'case_status', label: 'Case Status', minWidth: 100 },
    { id: 'created_time_stamp', label: 'Filed Date', minWidth: 100 }
];

function ReportDetailsView(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = props.listOfReports;
    const [noOfRowsPerPage, setNoOfRowsPerPage] = React.useState([]);
    if(rows.length >= 100){
        setNoOfRowsPerPage([10, 25, 50, 100])
    }else if(rows.length >= 50){
        setNoOfRowsPerPage([10, 25, 50])
    }else if(rows.length >= 25){
        setNoOfRowsPerPage([10, 25])
    }else if(rows.length >= 10){
        setNoOfRowsPerPage([10])
    }

    return (
        <div className='search-container' id='law-search-container' >
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
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
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

export default ReportDetailsView;