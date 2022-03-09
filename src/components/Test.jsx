import { CompareArrows, FlightLand, FlightTakeoff, Search } from '@mui/icons-material'
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, DesktopDateRangePicker, LoadingButton, LocalizationProvider, MobileDatePicker, MobileDateRangePicker } from '@mui/lab';
import { airports } from "../Data";

const Test = () => {

    const [value, setValue] = React.useState([null, null]);
    const [value2, setValue2] = React.useState(null);
    const [searchItems, setSearchItems] = React.useState({ trip: 2 });


    const handleSearch = async () => {

    }

    return (
        <Paper elevation={5}
            sx={{
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 2,
                width: "95%",
                maxWidth: 1000
            }}
        >
            <Grid container columnSpacing={1} rowSpacing={{ xs: 3, sm: 4 }} sx={{ p: 4 }}>
                <Grid item xs={6} sm={3} md={2.5} >

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
                            value={searchItems.trip}
                            autoWidth
                            onChange={(e) => { setSearchItems({ ...searchItems, [e.target.name]: e.target.value }) }}
                        >
                            <MenuItem value={1}>One Way</MenuItem>
                            <MenuItem value={2}>Round Trip</MenuItem>
                            <MenuItem value={3}>Multi City</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={2.5}>
                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Passengers</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={1}
                            label="Passengers"
                            autoWidth
                        // onChange={handleChange}
                        >
                            <MenuItem value="1">1 Adult</MenuItem>
                            <MenuItem value="2">2 Adult</MenuItem>
                            <MenuItem value="3">3 Adult</MenuItem>
                            <MenuItem value="4">4 Adult</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={2.5}>
                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={'Economy'}
                            label="Passengers"
                            autoWidth
                        // onChange={handleChange}
                        >
                            <MenuItem value="Economy">Economy</MenuItem>
                            <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="First">First</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={2.5}>
                    <FormControl size="small"
                        sx={{
                            minWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Bags</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={'2'}
                            label="Passengers"
                            autoWidth
                        // onChange={handleChange}
                        >
                            <MenuItem value={1}>1 Bag</MenuItem>
                            <MenuItem value={2}>2 Bags</MenuItem>
                            <MenuItem value={3}>3 Bags</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item md={2}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center'
                    }}>
                    <LoadingButton
                        color="primary"
                        onClick={handleSearch}
                        endIcon={<Search />}
                        // loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Sign In
                    </LoadingButton>
                </Grid>


                <Grid item xs={12} sm={5} md={3}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={airports}
                        renderInput={(params) => <TextField {...params} label="Origin" size="small"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <FlightTakeoff sx={{ position: 'absolute', right: 20 }} />
                                ),
                            }}
                        />}
                    />
                </Grid>

                <Grid item xs={12} sm={2} md={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: '1px solid primary.main',

                    }}>
                    <Button variant="outlined"><CompareArrows /></Button>
                </Grid>

                <Grid item xs={12} sm={5} md={3}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={airports}
                        renderInput={(params) => <TextField {...params} label="Destination" size="small"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <FlightLand sx={{ position: 'absolute', right: 20 }} />
                                ),
                            }}
                        />}
                    />
                </Grid>

                <Grid item xs={12} md={5}>

                    {searchItems.trip === 1 &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <DesktopDatePicker
                                    label="Depart Date"
                                    value={value2}
                                    onChange={(newValue) => {
                                        setValue2(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                />
                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                <MobileDatePicker
                                    label="Depart Date"
                                    value={value2}
                                    onChange={(newValue) => {
                                        setValue2(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </Box>
                        </LocalizationProvider>
                    }

                    {searchItems.trip !== 1 &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <DesktopDateRangePicker
                                    startText="Depart Date"
                                    endText="Return Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} fullWidth size="small" />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} fullWidth size="small" />
                                        </React.Fragment>
                                    )}
                                />
                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                <MobileDateRangePicker
                                    startText="Depart Date"
                                    endText="Return Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} fullWidth />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} fullWidth />
                                        </React.Fragment>
                                    )}
                                />
                            </Box>
                        </LocalizationProvider>
                    }

                </Grid>

                <Grid item xs={12}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        justifyContent: 'center'
                    }}>
                    <LoadingButton
                        sx={{
                            mt: 1,
                            width: { xs: '100%', sm: '60%' }
                        }}
                        color="primary"
                        onClick={handleSearch}
                        endIcon={<Search />}
                        // loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Sign In
                    </LoadingButton>
                </Grid>

            </Grid>

        </Paper >
    )
}

export default Test