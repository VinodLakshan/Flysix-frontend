import { Person } from '@mui/icons-material'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Const } from './../Properties'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LoadingButton, LocalizationProvider, MobileDatePicker } from '@mui/lab';

import React, { useState } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import { formateDateToSimpleDate } from '../utils/Common';

const PassengerForm = ({ passengerDetails, changePassengerDetails, passengerEditable }) => {

    const [passenger, setPassenger] = useState(passengerDetails)

    return (
        <Grid container justifyContent="center" rowSpacing={4} columnGap={2}>
            <Grid item xs={4} sm={2}>
                <FormControl fullWidth size="small">
                    <InputLabel required id="age-select-label">Title</InputLabel>
                    <Select
                        value={passenger.title}
                        label="Age"
                        name="title"
                        onChange={(e) => {
                            setPassenger({ ...passenger, [e.target.name]: e.target.value })
                        }}
                        onBlur={() => changePassengerDetails(passenger)}
                        disabled={!passengerEditable}
                    >
                        <MenuItem sx={{ display: passengerDetails.type !== Const.Adult ? "none" : "flex" }} value="Mr">Mr</MenuItem>
                        <MenuItem sx={{ display: passengerDetails.type === Const.Adult ? "none" : "flex" }} value="Master">Master</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem sx={{ display: passengerDetails.type !== Const.Adult ? "none" : "flex" }} value="Mrs">Mrs</MenuItem>
                        <MenuItem sx={{ display: passengerDetails.type !== Const.Adult ? "none" : "flex" }} value="Dr">Dr</MenuItem>
                        <MenuItem sx={{ display: passengerDetails.type !== Const.Adult ? "none" : "flex" }} value="Rev">Rev</MenuItem>
                        <MenuItem sx={{ display: passengerDetails.type !== Const.Adult ? "none" : "flex" }} value="Prof">Prof</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField required
                    fullWidth
                    value={passenger.firstName}
                    onChange={(e) => setPassenger({ ...passenger, [e.target.name]: e.target.value })}
                    onBlur={() => changePassengerDetails(passenger)}
                    label="First Name"
                    id="first-name"
                    name="firstName"
                    size="small"
                    disabled={!passengerEditable}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField required
                    fullWidth
                    value={passenger.lastName}
                    onChange={(e) => setPassenger({ ...passenger, [e.target.name]: e.target.value })}
                    onBlur={() => changePassengerDetails(passenger)}
                    label="Last Name"
                    id="last-name"
                    name="lastName"
                    size="small"
                    disabled={!passengerEditable}
                />
            </Grid>


            <Grid item xs={12} sm={5.25}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={passenger.dateOfBirth}
                            onChange={(newValue) => setPassenger({ ...passenger, "dateOfBirth": formateDateToSimpleDate(newValue) })}
                            onBlur={() => changePassengerDetails(passenger)}
                            InputProps={{
                                readOnly: true,
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                            disabled={!passengerEditable}
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MobileDatePicker
                            label="Date of Birth"
                            value={passenger.dateOfBirth}
                            onChange={(newValue) => setPassenger({ ...passenger, "dateOfBirth": formateDateToSimpleDate(newValue) })}
                            onBlur={() => changePassengerDetails(passenger)}
                            InputProps={{
                                readOnly: true,
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                            disabled={!passengerEditable}
                        />
                    </Box>
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    value={passenger.passportNo}
                    onChange={(e) => setPassenger({ ...passenger, [e.target.name]: e.target.value })}
                    onBlur={() => changePassengerDetails(passenger)}
                    name="passportNo"
                    label="Passport Number"
                    id="passport-number"
                    size="small"
                    disabled={!passengerEditable}
                />
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DesktopDatePicker
                            label="Expire Date"
                            name="passportExpireDate"
                            value={passenger.passportExpireDate}
                            onChange={(newValue) => setPassenger({ ...passenger, "passportExpireDate": formateDateToSimpleDate(newValue) })}
                            onBlur={() => changePassengerDetails(passenger)}
                            InputProps={{
                                readOnly: true,
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                            disabled={!passengerEditable}
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MobileDatePicker
                            label="Expire Date"
                            name="passportExpireDate"
                            value={passenger.passportExpireDate}
                            onChange={(newValue) => setPassenger({ ...passenger, "passportExpireDate": formateDateToSimpleDate(newValue) })}
                            onBlur={() => changePassengerDetails(passenger)}
                            InputProps={{
                                readOnly: true,
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                            disabled={!passengerEditable}
                        />
                    </Box>
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    value={passenger.issuedCountry}
                    onChange={(e) => setPassenger({ ...passenger, [e.target.name]: e.target.value })}
                    onBlur={() => changePassengerDetails(passenger)}
                    label="Issued Country"
                    name="issuedCountry"
                    id="issued-country"
                    size="small"
                    disabled={!passengerEditable}
                />
            </Grid>

            {(passenger.type === Const.Adult && passenger.count === 1) && <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    value={passenger.email}
                    onChange={(e) => setPassenger({ ...passenger, [e.target.name]: e.target.value })}
                    onBlur={() => changePassengerDetails(passenger)}
                    label="Email"
                    name="email"
                    id="email"
                    size="small"
                    helperText="* Your ticket will be sent to this email."
                    disabled={!passengerEditable}
                />
            </Grid>}

            {(passenger.type === Const.Adult && passenger.count === 1) && <Grid item xs={12} sm={5.25}>
                <MuiPhoneNumber
                    disableAreaCodes
                    fullWidth
                    value={passenger.mobileNo}
                    onChange={(newValue) => setPassenger({ ...passenger, "mobileNo": newValue })}
                    onBlur={() => changePassengerDetails(passenger)}
                    variant="outlined"
                    size="small"
                    name="mobileNo"
                    label="Mobile Number"
                    disabled={!passengerEditable}
                    countryCodeEditable={false}
                    defaultCountry={'us'} />
            </Grid>}
        </Grid >
    )
}

export default PassengerForm