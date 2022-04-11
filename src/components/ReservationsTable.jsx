import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Stack, TablePagination, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Const } from '../Properties';
import { writeToExcel } from '../utils/Common';

const ReservationsTable = ({ rows }) => {

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [stateRows, setStateRows] = React.useState([]);
    const [openConfirmation, setOpenConfirmation] = React.useState(false);

    const handleClickOpenConfirmation = () => {
        setOpenConfirmation(true);
    };

    const handleCloseCOnfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByAny = (query) => {

        const filteredRows = rows.filter(row =>
            Object.keys(row).some(key => row[key].toString().toLowerCase().includes(query.toLowerCase()))
        );

        setStateRows(filteredRows);

    }

    const exportData = () => {

        const headers = ["Booking ID", "Class", "Trip", "Origin", "Destination", "Payment", "Status"];
        writeToExcel(headers, stateRows);

    }

    React.useEffect(() => {
        setStateRows(rows);

    }, [rows])


    return (

        <Paper elevation={5} sx={{ p: 2, borderRadius: 2 }} >

            <Stack direction="row" justifyContent="space-between"
                sx={{ px: 2, pb: 2 }}>

                <TextField
                    onChange={(e) => handleFilterByAny(e.target.value)}
                    placeholder="Search by any..."
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }}
                    sx={{
                        maxWidth: { xs: '60%', sm: 300 }
                    }}
                />

                <Button variant="outlined" size="small" onClick={handleClickOpenConfirmation}>
                    Export Data
                </Button>

                <Dialog
                    open={openConfirmation}
                    onClose={handleCloseCOnfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to export filtered reservation as an excel file ?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button variant='outlined' color="error" onClick={handleCloseCOnfirmation}>Cancel</Button>
                        <Button variant='contained' onClick={exportData}>Confirm</Button>
                    </DialogActions>
                </Dialog>

            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, width: "90vw" }} aria-label="simple table">
                    <TableHead sx={{ bgcolor: "primary.main" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }} align="center">Reservation ID</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Class</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Trip</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Origin</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Destination</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Payment</TableCell>
                            <TableCell sx={{ color: "white" }} align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            stateRows.length > 0 && stateRows
                                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                .map((row, i) => (
                                    <TableRow key={i}>

                                        <TableCell align="center">{row.reservationId}</TableCell>
                                        <TableCell align="center">{row.bookingClass}</TableCell>
                                        <TableCell align="center">{row.trip}</TableCell>
                                        <TableCell align="center">{row.origin}</TableCell>
                                        <TableCell align="center">{row.destination}</TableCell>
                                        <TableCell align="center">{row.payment}</TableCell>
                                        <TableCell align="center">
                                            {(row.status === Const.Confirmed) && <Chip sx={{ color: "white" }} size="small" label={row.status} color="success" />}
                                            {(row.status === Const.Unconfirmed) && <Chip sx={{ color: "white" }} size="small" label={row.status} color="warning" />}
                                            {(row.status === Const.Cancelled) && <Chip sx={{ color: "white" }} size="small" label={row.status} color="error" />}
                                        </TableCell>

                                    </TableRow>
                                ))
                        }

                        {
                            stateRows.length === 0 &&

                            <TableRow>
                                <TableCell colSpan={7} align="center">No data to show</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {
                stateRows.length > 0 &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={stateRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    )
}

export default ReservationsTable