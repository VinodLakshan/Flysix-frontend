import { Button, Stack } from '@mui/material'
import React from 'react'
import DiscountForm from '../components/DiscountForm'
import FareSummary from '../components/FareSummary'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PassengerDetails from '../components/PassengerDetails'
import TripDetails from '../components/TripDetails'

const FlightDetails = () => {
    return (
        <Stack
            direction="column"
            alignItems='center'
            justifyContent="center"
            spacing={4}
        >
            <PageHeader />
            <Stack direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ px: 2 }}
            >

                <Stack spacing={2}>

                    <TripDetails />
                    <PassengerDetails />

                </Stack>

                <Stack spacing={2}>
                    <FareSummary />
                    <DiscountForm />

                    <Button variant="contained">
                        Continue to Payment
                    </Button>

                </Stack>

            </Stack>
            <Footer />

        </Stack >
    )
}

export default FlightDetails