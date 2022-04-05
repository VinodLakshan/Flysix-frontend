import { CompareArrows, FlightLand, FlightTakeoff, Search } from '@mui/icons-material'
import { Alert, Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Slider, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, DesktopDateRangePicker, LoadingButton, LocalizationProvider, MobileDatePicker, MobileDateRangePicker } from '@mui/lab';
import { airports } from "../Data";
import { useDispatch, useSelector } from 'react-redux';
import { findFlights } from '../utils/ApiCalls';
import { useNavigate } from 'react-router-dom';
import { Class, Trips } from '../Properties';
import { formateDateToSimpleDate, getSliderMarks } from '../utils/Common';

const SearchFlights = ({ type }) => {

    const [alertError, setAlertError] = React.useState("");
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [passengerDialogOpen, setPassengerDialogOpen] = React.useState(false);

    const [searchItems, setSearchItems] = React.useState({
        trip: Trips.round,
        bookingClass: Class.economy,
        origin: null,
        destination: null,
        departDate: null,
        returnDate: null,
        adults: 1,
        children: 0,
        infants: 0
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isFetching, searchCriteria } = useSelector(state => state.flight);

    useEffect(() => {

        if (searchCriteria) setSearchItems(searchCriteria);

    }, [searchCriteria])


    const handleSearch = async () => {

        setShowErrorAlert(false);

        if (searchItems.origin && searchItems.destination && searchItems.departDate &&
            ((searchItems.trip === Trips.oneWay) || (searchItems.trip === Trips.round && searchItems.returnDate))) {

            if (searchItems.origin.id !== searchItems.destination.id) {

                const res = await findFlights(dispatch, searchItems);

                switch (res.status) {
                    case 200:
                        navigate("/flightResults", { state: { flightList: res.data } });
                        break;

                    default:
                        setAlertError(res.error);
                        setShowErrorAlert(true);
                        break;
                }


            } else {
                setAlertError("Origin and destination cannot be the same.");
                setShowErrorAlert(true);
            }


        } else {
            setAlertError("Please fill all the required fields.");
            setShowErrorAlert(true);
        }


    }

    return (
        <Paper elevation={5}
            sx={{
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 2,
                maxWidth: type === "hr" ? 1100 : 800
            }}
        >
            <Grid container columnSpacing={1} rowSpacing={{ xs: 3, sm: 4 }} sx={{ p: 4 }}>
                <Grid item xs={6} sm={3} md={type === "hr" ? 2.5 : 3}>

                    <FormControl size="small" required
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
                            onChange={(e) => {
                                let returnDate = searchItems.returnDate;
                                if (e.target.value === Trips.oneWay) returnDate = null;
                                setSearchItems({ ...searchItems, [e.target.name]: e.target.value, "returnDate": returnDate })
                            }}
                        >
                            <MenuItem value={Trips.oneWay}>{Trips.oneWay}</MenuItem>
                            <MenuItem value={Trips.round}>{Trips.round}</MenuItem>
                            <MenuItem value={Trips.multi}>{Trips.multi}</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={type === "hr" ? 2.5 : 3}>
                    <FormControl size="small" required
                        sx={{
                            minWidth: 130,
                            maxWidth: 130,
                        }}
                    >
                        <TextField
                            label="Passengers"
                            size="small"
                            required
                            value={`${searchItems.adults + searchItems.children + searchItems.infants} Travellers`}
                            onClick={() => setPassengerDialogOpen(true)}
                        />

                        <Dialog disableEscapeKeyDown open={passengerDialogOpen}
                            onClose={() => setPassengerDialogOpen(false)}
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <DialogTitle>Passengers</DialogTitle>
                            <DialogContent>
                                <Stack sx={{ width: 280, height: 225, pt: 1, px: 2 }}
                                    spacing={4}
                                >
                                    <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="space-between">
                                        <Slider
                                            sx={{
                                                maxWidth: 150
                                            }}
                                            name="adults"
                                            value={searchItems.adults}
                                            step={1}
                                            marks={getSliderMarks(1, 5)}
                                            min={1}
                                            max={5}
                                            onChange={(e) => {
                                                setSearchItems({ ...searchItems, [e.target.name]: e.target.value })
                                            }}
                                            valueLabelDisplay="off"
                                        />
                                        <Typography variant='h6' sx={{ width: 90 }}> Adults </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="space-between">
                                        <Slider
                                            sx={{
                                                maxWidth: 150
                                            }}
                                            name="children"
                                            value={searchItems.children}
                                            step={1}
                                            marks={getSliderMarks(0, 5)}
                                            min={0}
                                            max={5}
                                            onChange={(e) => setSearchItems({ ...searchItems, [e.target.name]: e.target.value })}
                                            valueLabelDisplay="off"
                                        />
                                        <Typography variant='h6' sx={{ width: 90 }}> Children </Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={3} alignItems="flex-start" justifyContent="space-between">
                                        <Slider
                                            sx={{
                                                maxWidth: 150
                                            }}
                                            name="infants"
                                            value={searchItems.infants}
                                            step={1}
                                            marks={getSliderMarks(0, 5)}
                                            min={0}
                                            max={5}
                                            onChange={(e) => setSearchItems({ ...searchItems, [e.target.name]: e.target.value })}
                                            valueLabelDisplay="off"
                                        />
                                        <Typography variant='h6' sx={{ width: 90 }}> Infants </Typography>
                                    </Stack>
                                </Stack>

                            </DialogContent>
                        </Dialog>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={type === "hr" ? 2.5 : 3}>
                    <FormControl size="small" required
                        sx={{
                            minWidth: 130,
                            maxWidth: 130,
                        }}
                    >

                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="bookingClass"
                            value={searchItems.bookingClass}
                            label="bookingClass"
                            autoWidth
                            onChange={(e) => {
                                setSearchItems({ ...searchItems, [e.target.name]: e.target.value })
                            }}
                        >
                            <MenuItem value={Class.economy}>{Class.economy}</MenuItem>
                            <MenuItem value={Class.premiumEconomy}>{Class.premiumEconomy}</MenuItem>
                            <MenuItem value={Class.business}>{Class.business}</MenuItem>
                            <MenuItem value={Class.first}>{Class.first}</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3} md={type === "hr" ? 2.5 : 3}>
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
                            label="Bags"
                            autoWidth
                        >
                            <MenuItem value={1}>1 Bag</MenuItem>
                            <MenuItem value={2}>2 Bags</MenuItem>
                            <MenuItem value={3}>3 Bags</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>

                <Grid item md={2}
                    sx={{
                        display: type === "hr" ? { xs: 'none', md: 'flex' } : 'none',
                        justifyContent: 'center'
                    }}>
                    <LoadingButton
                        color="primary"
                        onClick={handleSearch}
                        endIcon={<Search />}
                        loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Search
                    </LoadingButton>
                </Grid>

                <Grid item xs={12} sm={5} md={type === "hr" ? 3 : 5}>
                    <Autocomplete
                        disablePortal
                        id="input-origin"
                        options={airports}
                        value={searchItems.origin}
                        onChange={(e, newValue) => setSearchItems({ ...searchItems, "origin": newValue })}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField required {...params} label="Origin" size="small"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <FlightTakeoff sx={{ position: 'absolute', right: 20 }} />
                                ),
                            }}
                        />}
                    />
                </Grid>

                <Grid item xs={12} sm={2} md={type === "hr" ? 1 : 2}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        border: '1px solid primary.main',
                    }}>
                    <Button variant="outlined" onClick={() => setSearchItems({
                        ...searchItems,
                        "origin": searchItems.destination,
                        "destination": searchItems.origin
                    })}><CompareArrows /></Button>
                </Grid>

                <Grid item xs={12} sm={5} md={type === "hr" ? 3 : 5}>
                    <Autocomplete
                        disablePortal
                        id="input-destination"
                        options={airports}
                        value={searchItems.destination}
                        onChange={(e, newValue) => setSearchItems({ ...searchItems, "destination": newValue })}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField required {...params} label="Destination" size="small"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <FlightLand sx={{ position: 'absolute', right: 20 }} />
                                ),
                            }}
                        />}
                    />
                </Grid>

                <Grid item xs={12} md={type === "hr" ? 5 : 12}>

                    {searchItems.trip === Trips.oneWay &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <DesktopDatePicker
                                    label="Depart Date"
                                    value={searchItems.departDate}
                                    onChange={(newValue) => {
                                        setSearchItems({ ...searchItems, "departDate": formateDateToSimpleDate(newValue) });
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                />
                            </Box>
                            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                <MobileDatePicker
                                    label="Depart Date"
                                    value={searchItems.departDate}
                                    onChange={(newValue) => {
                                        setSearchItems({ ...searchItems, "departDate": formateDateToSimpleDate(newValue) });
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                />
                            </Box>
                        </LocalizationProvider>
                    }

                    {searchItems.trip === Trips.round &&
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <DesktopDateRangePicker
                                    startText="Depart Date"
                                    endText="Return Date"
                                    value={[searchItems.departDate, searchItems.returnDate]}
                                    onChange={(newValue) => {
                                        newValue[0] && setSearchItems({ ...searchItems, "departDate": formateDateToSimpleDate(newValue[0]) });
                                        newValue[1] && setSearchItems({ ...searchItems, "returnDate": formateDateToSimpleDate(newValue[1]) });
                                    }}
                                    InputProps={{
                                        readOnly: true,
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
                                    value={[searchItems.departDate, searchItems.returnDate]}
                                    onChange={(newValue) => {
                                        newValue[0] && setSearchItems({ ...searchItems, "departDate": formateDateToSimpleDate(newValue[0]) });
                                        newValue[1] && setSearchItems({ ...searchItems, "returnDate": formateDateToSimpleDate(newValue[1]) });
                                    }}
                                    InputProps={{
                                        readOnly: true,
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
                        </LocalizationProvider>
                    }

                </Grid>

                <Grid item xs={12}
                    sx={{
                        display: type === "hr" ? { xs: 'flex', md: 'none' } : 'flex',
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
                        loading={isFetching}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Search
                    </LoadingButton>
                </Grid>

            </Grid>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar>
        </Paper >
    )
}

export default SearchFlights
