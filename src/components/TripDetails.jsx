import { AirplaneTicket } from '@mui/icons-material'
import { Chip, Divider, Paper, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import Trip from './Trip'

const CDivider = styled(Divider)(() => ({
    marginBottom: 10,
    marginTop: 10
}))

const CTypo = styled(Typography)(() => ({
    fontSize: 16
}))

const TripDetails = () => {

    return (
        <Paper elevation={5} sx={{ borderRadius: 2, p: 2, width: { md: "60vw" }, maxWidth: 800 }}>
            <Stack justifyContent="center" spacing={2} >
                <Stack direction="row" spacing={1}>
                    <AirplaneTicket />
                    <Typography variant="h6">Ticket Details</Typography>
                </Stack>
                <CDivider sx={{ backgroundColor: 'primary.main' }} />

                <Stack direction="row" sx={{ py: 2 }} alignItems={{ xs: "flex-start", sm: "center" }}>
                    <img src="/static/icons/flightR.png" width={25} alt="FlightR" />
                    <Stack spacing={1} sx={{ pl: 1 }} direction={{ xs: "column", sm: "row" }}>
                        <CTypo variant="h6">Colombo - Amsterdam </CTypo>
                        <CTypo variant="h6" sx={{ display: { xs: "none", sm: "flex" } }}>|</CTypo>
                        <CTypo variant="h6"> Wednesday, 11 May 2022</CTypo>
                    </Stack>
                </Stack>

                <Stack sx={{ pl: { md: 6 } }} justifyContent="flex-start">
                    <Trip />
                    <Divider sx={{ my: 2 }}>
                        <Chip size="small" label="DXB - Layover : 6hr 05m" variant="outlined" />
                    </Divider>
                    <Trip />
                </Stack>

                <Stack direction="row" sx={{ py: 2 }} alignItems={{ xs: "flex-start", sm: "center" }}>
                    <img src="/static/icons/flightL.png" width={25} alt="FlightR" />
                    <Stack spacing={1} sx={{ pl: 1 }} direction={{ xs: "column", sm: "row" }}>
                        <CTypo variant="h6">Amsterdam - Colombo </CTypo>
                        <CTypo variant="h6" sx={{ display: { xs: "none", sm: "flex" } }}>|</CTypo>
                        <CTypo variant="h6"> Wednesday, 11 May 2022</CTypo>
                    </Stack>
                </Stack>

                <Stack sx={{ pl: { md: 6 } }} justifyContent="flex-start">
                    <Trip />
                    <Divider sx={{ my: 2 }}>
                        <Chip size="small" label="DXB - Layover : 6hr 05m" variant="outlined" />
                    </Divider>
                    <Trip />
                </Stack>

            </Stack>
        </Paper>


    )
}

export default TripDetails