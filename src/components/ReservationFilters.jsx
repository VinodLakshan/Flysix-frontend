import React from 'react'
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Trips, Const, Class } from '../Properties';


const ReservationFilters = ({ filters, setFilters, applyFilters }) => {
    return (
        <Paper elevation={5} sx={{ p: 2, mb: 3, borderRadius: 2, maxWidth: 550 }}>

            <Stack spacing={2} alignItems={{ sm: "center" }} >

                <Typography variant="body1">
                    Reservation Filters
                </Typography>

                <Stack spacing={2} direction={{ sm: "row", xs: "column" }}>

                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Trip</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="trip"
                            label="Trip"
                            value={filters.trip}
                            autoWidth
                            onChange={(e) => setFilters({ ...filters, "trip": e.target.value })}
                        >
                            <MenuItem value={Const.All}>{Const.All}</MenuItem>
                            <MenuItem value={Trips.oneWay}>{Trips.oneWay}</MenuItem>
                            <MenuItem value={Trips.round}>{Trips.round}</MenuItem>
                            <MenuItem value={Trips.multi}>{Trips.multi}</MenuItem>
                        </Select>

                    </FormControl>

                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                            maxWidth: { sm: 130 },
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="bookingClass"
                            value={filters.class}
                            label="bookingClass"
                            autoWidth
                            onChange={(e) => setFilters({ ...filters, "class": e.target.value })}
                        >
                            <MenuItem value={Const.All}>{Const.All}</MenuItem>
                            <MenuItem value={Class.economy}>{Class.economy}</MenuItem>
                            <MenuItem value={Class.premiumEconomy}>{Class.premiumEconomy}</MenuItem>
                            <MenuItem value={Class.business}>{Class.business}</MenuItem>
                            <MenuItem value={Class.first}>{Class.first}</MenuItem>
                        </Select>

                    </FormControl>

                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="bookingClass"
                            value={filters.status}
                            label="bookingClass"
                            autoWidth
                            onChange={(e) => setFilters({ ...filters, "status": e.target.value })}

                        >
                            <MenuItem value={Const.All}>{Const.All}</MenuItem>
                            <MenuItem value={Const.Confirmed}>{Const.Confirmed}</MenuItem>
                            <MenuItem value={Const.Unconfirmed}>{Const.Unconfirmed}</MenuItem>
                            <MenuItem value={Const.Cancelled}>{Const.Cancelled}</MenuItem>
                        </Select>

                    </FormControl>

                    <Button variant='contained' fullWidth
                        sx={{
                            maxWidth: { sm: 150 }
                        }}
                        onClick={applyFilters}
                    >
                        Apply
                    </Button>

                </Stack>
            </Stack>
        </Paper>
    )
}

export default ReservationFilters