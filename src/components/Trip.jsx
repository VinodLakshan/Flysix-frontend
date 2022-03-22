import React from 'react'
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, ArrowRightAlt } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Trip = ({ tripType, tripData }) => {

    const getStops = (segments) => {
        let stops = "";

        for (let i = 0; i < segments.length - 1; i++) {

            stops += segments[i].destination.id;

            if (i < (segments.length - 2)) stops += ", "
        }

        return stops;
    }

    return (
        <Grid container columnSpacing={1} alignItems="center" justifyContent="space-between">
            {tripType && <Grid item xs={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {tripType === "outbound" && <ArrowForwardIosRounded sx={{ pl: 1 }} />}
                {tripType === "inbound" && <ArrowBackIosNewRounded sx={{ pl: 1 }} />}
            </Grid>}
            <Grid item xs={6} sm={3} md={3}>
                <Stack>
                    <Typography variant="body1"> {tripData.origin.label}</Typography>
                    <Typography variant="body2"> {tripData.departAt}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} sm={4} md={4} >
                <Stack alignItems="center" sx={{ position: "relative", top: { xs: 30, sm: 0 } }}>
                    <ArrowRightAlt />
                    <Stack direction="row">
                        <Typography variant="body2"> {tripData.duration} </Typography>
                        {
                            tripData.segments &&
                            <Typography variant="body2" sx={{ pl: 1 }}> - {tripData.segments.length - 1} Stops </Typography>
                        }
                    </Stack>
                    {
                        tripData.segments &&
                        <Typography variant="body2"> {getStops(tripData.segments)} </Typography>
                    }
                    {
                        !tripData.segments &&
                        <Typography variant="body2" sx={{ py: 1 }}> </Typography>
                    }
                </Stack>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
                <Stack >
                    <Typography variant="body1">{tripData.destination.label}</Typography>
                    <Typography variant="body2"> {tripData.arriveAt}</Typography>
                </Stack>
            </Grid>
        </Grid >
    )
}

export default Trip