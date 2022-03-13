import { Person } from '@mui/icons-material'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Const } from './../Properties'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LoadingButton, LocalizationProvider, MobileDatePicker } from '@mui/lab';

import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';

const PassengerForm = ({ type, count }) => {

    const [value2, setValue2] = React.useState(null);
    const [title, setTitle] = React.useState("Mr");

    return (
        <Grid container justifyContent="center" rowSpacing={4} columnGap={2}>
            <Grid item xs={4} sm={2}>
                <FormControl fullWidth size="small">
                    <InputLabel required id="age-select-label">Title</InputLabel>
                    <Select
                        value={title}
                        label="Age"
                    // onChange={handleChange}
                    >
                        <MenuItem sx={{ display: type !== Const.Adult ? "none" : "flex" }} value="Mr">Mr</MenuItem>
                        <MenuItem sx={{ display: type === Const.Adult ? "none" : "flex" }} value="Master">Master</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem sx={{ display: type !== Const.Adult ? "none" : "flex" }} value="Mrs">Mrs</MenuItem>
                        <MenuItem sx={{ display: type !== Const.Adult ? "none" : "flex" }} value="Dr">Dr</MenuItem>
                        <MenuItem sx={{ display: type !== Const.Adult ? "none" : "flex" }} value="Rev">Rev</MenuItem>
                        <MenuItem sx={{ display: type !== Const.Adult ? "none" : "flex" }} value="Prof">Prof</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField required
                    fullWidth
                    label="First Name"
                    id="first-name"
                    size="small"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField required
                    fullWidth
                    label="Last Name"
                    id="last-name"
                    size="small"
                />
            </Grid>


            <Grid item xs={12} sm={5.25}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MobileDatePicker
                            label="Date of Birth"
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                        />
                    </Box>
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    label="Passport Number"
                    id="passport-number"
                    size="small"
                />
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DesktopDatePicker
                            label="Expire Date"
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <MobileDatePicker
                            label="Expire Date"
                            value={value2}
                            onChange={(newValue) => {
                                setValue2(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} required fullWidth size="small" />}
                        />
                    </Box>
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    label="Issued Country"
                    id="issued-country"
                    size="small"
                />
            </Grid>

            {(type === Const.Adult && count === 1) && <Grid item xs={12} sm={5.25}>
                <TextField required
                    fullWidth
                    label="Email"
                    id="email"
                    size="small"
                    helperText="* Your ticket will be sent to this email."
                />
            </Grid>}

            {(type === Const.Adult && count === 1) && <Grid item xs={12} sm={5.25}>
                <MuiPhoneNumber
                    disableAreaCodes
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Mobile Number"
                    countryCodeEditable={false}
                    defaultCountry={'us'} />
            </Grid>}
        </Grid >
    )
}

export default PassengerForm