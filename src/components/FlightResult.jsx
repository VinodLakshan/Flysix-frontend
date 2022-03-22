import { Luggage } from '@mui/icons-material'
import { Avatar, Chip, Divider, Grid, Paper, Stack, styled, Typography, Button, Box } from '@mui/material'
import React from 'react'
import Trip from './Trip'
import { useDispatch, useSelector } from 'react-redux';
import { Const } from './../Properties'
import { useNavigate } from 'react-router-dom';
import { updateSelectedBooking } from '../redux/userRedux';

const CDivider = styled(Divider)(() => ({
    marginBottom: 10,
    marginTop: 10
}))

const FlightResult = ({ flight }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (bookingType) => {
        const selectedBooking = {
            bookingType: bookingType,
            selectedFlight: flight
        }
        dispatch(updateSelectedBooking(selectedBooking))
        navigate("/passenger");
    }

    return (
        <Paper elevation={5} sx={{ borderRadius: 2, p: 1, pb: 2 }}>
            <Grid container alignItems="center">
                <Grid item xs={12} sm={12} md={9.5} sx={{ pr: 1 }}>
                    <Trip tripType="outbound" tripData={flight.depart} />

                    {flight.return && <Box>
                        <CDivider />
                        <Trip tripType="inbound" tripData={flight.return} />
                    </Box>}

                </Grid>

                <Grid item xs={12} sm={12} md={2.5}>
                    <Grid container columnSpacing={1}>
                        <Grid item xs={12} sm={12} md={0.5}>
                            <Divider orientation="vertical" sx={{ backgroundColor: 'primary.main', display: { xs: 'none', sm: 'none', md: 'flex' } }} />
                            <CDivider sx={{ backgroundColor: 'primary.main', display: { xs: 'flex', sm: 'flex', md: 'none' } }} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={11} >
                            <Grid container sx={{ pl: 1 }} justifyContent="center">

                                <Stack sx={{ gap: { sm: 2, md: 1 }, maxWidth: { sm: 400, md: 150 } }}
                                    alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
                                    direction={{ sm: 'row', md: 'column' }}
                                >

                                    <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1}>
                                        <Chip sx={{ maxWidth: 50 }} icon={<Luggage />} size="small" label="1" variant="outlined" />
                                        <Typography variant="body2" sx={{ fontSize: "13px" }}>{flight.airline.name}</Typography>
                                        {/* <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar sx={{ width: 28, height: 28 }} variant="rounded" src='/static/illustrations/Emirates_logo.png' />
                                        </Stack> */}
                                        <Typography variant="h6">{`${flight.price.currency} ${flight.price.total}`} </Typography>
                                    </Stack>


                                    <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1}
                                        sx={{ pl: { xs: 3, sm: 0 } }}
                                    >
                                        <Button onClick={() => handleClick(Const.HoldForFree)} sx={{ minWidth: { sm: 125, md: "auto" } }} >
                                            HOLD for FREE
                                        </Button>
                                        <Button variant="contained" onClick={() => handleClick(Const.Instant)} fullWidth>
                                            Book
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default FlightResult