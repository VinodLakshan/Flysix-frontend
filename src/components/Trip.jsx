import React from 'react'
import { ArrowBackIosNewRounded, ArrowForwardIosRounded, ArrowRightAlt } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Trip = ({ tripType }) => {
    return (
        <Grid container columnSpacing={1} alignItems="center" justifyContent="space-between">
            {tripType && <Grid item xs={0.5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {tripType === "outbound" && <ArrowForwardIosRounded sx={{ pl: 1 }} />}
                {tripType === "inbound" && <ArrowBackIosNewRounded sx={{ pl: 1 }} />}
            </Grid>}
            <Grid item xs={6} sm={3} md={3}>
                <Stack>
                    <Typography variant="body1"> San Francisco (SFO)</Typography>
                    <Typography variant="body2"> Mon, 14 Apr, 3:15</Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} sm={4} md={4} >
                <Stack alignItems="center" sx={{ position: "relative", top: { xs: 30, sm: 0 } }}>
                    <ArrowRightAlt />
                    <Stack direction="row">
                        <Typography variant="body2"> 13hr 25m </Typography>
                        <Typography variant="body2" sx={{ pl: 1 }}> - 1 Stop </Typography>
                    </Stack>
                    <Typography variant="body2"> DXB </Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} sm={3} md={3}>
                <Stack >
                    <Typography variant="body1">Colombo (CMB)</Typography>
                    <Typography variant="body2"> Mon, 14 Apr, 13:15</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Trip