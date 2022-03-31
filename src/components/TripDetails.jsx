import { AirplaneTicket } from '@mui/icons-material'
import { Chip, Divider, Paper, Stack, styled, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Const } from '../Properties'
import { formatDateToDate } from '../utils/Common'
import Trip from './Trip'

const CDivider = styled(Divider)(() => ({
    marginBottom: 10,
    marginTop: 10
}))

const CTypo = styled(Typography)(() => ({
    fontSize: 16
}))

const TripDetails = ({ tripData }) => {

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
                        <CTypo variant="h6">{tripData.departTrip.origin.label} - {tripData.departTrip.destination.label}</CTypo>
                        <CTypo variant="h6" sx={{ display: { xs: "none", sm: "flex" } }}>|</CTypo>
                        <CTypo variant="h6"> {formatDateToDate(tripData.departTrip.departAt, Const.dateWithFullDay)}</CTypo>
                    </Stack>
                </Stack>

                <Stack sx={{ pl: { md: 6 } }} justifyContent="flex-start">

                    {
                        tripData.departTrip.segments.map((data, index) => {

                            return (<Box key={index}>
                                <Trip tripData={data} />

                                {
                                    data.layover &&
                                    <Divider sx={{ my: 2 }}>
                                        <Chip size="small" label={`${data.destination.id} - Layover : ${data.layover}`} variant="outlined" />
                                    </Divider>
                                }
                            </Box>)
                        })
                    }

                </Stack>

                {
                    tripData.returnTrip &&
                    <Box>
                        <Stack direction="row" sx={{ py: 2 }} alignItems={{ xs: "flex-start", sm: "center" }}>
                            <img src="/static/icons/flightL.png" width={25} alt="FlightR" />
                            <Stack spacing={1} sx={{ pl: 1 }} direction={{ xs: "column", sm: "row" }}>
                                <CTypo variant="h6">{tripData.returnTrip.origin.label} - {tripData.returnTrip.destination.label}</CTypo>
                                <CTypo variant="h6" sx={{ display: { xs: "none", sm: "flex" } }}>|</CTypo>
                                <CTypo variant="h6">{formatDateToDate(tripData.returnTrip.departAt, Const.dateWithFullDay)} </CTypo>
                            </Stack>
                        </Stack>

                        <Stack sx={{ pl: { md: 6 } }} justifyContent="flex-start">

                            {
                                tripData.returnTrip.segments.map((data, index) => {

                                    return (<Box key={index}>
                                        <Trip tripData={data} />

                                        {
                                            data.layover &&
                                            <Divider sx={{ my: 2 }}>
                                                <Chip size="small" label={`${data.destination.id} - Layover : ${data.layover}`} variant="outlined" />
                                            </Divider>
                                        }
                                    </Box>)
                                })
                            }

                        </Stack>

                    </Box>
                }
            </Stack>
        </Paper>


    )
}

export default TripDetails