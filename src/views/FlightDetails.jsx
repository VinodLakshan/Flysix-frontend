import { Button, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DiscountForm from '../components/DiscountForm'
import FareSummary from '../components/FareSummary'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PassengerDetails from '../components/PassengerDetails'
import TripDetails from '../components/TripDetails'
import StripePayment from '../components/StripePayment'
import { updatePassengers } from '../redux/userRedux'

const FlightDetails = () => {

    const { selectedBooking } = useSelector(state => state.user);
    const { searchCriteria } = useSelector(state => state.flight);
    const [passengers, setPassengers] = React.useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedBooking.selectedFlight) {
            navigate("/")

        } else {
            dispatch(updatePassengers(passengers))
        }



    }, [selectedBooking, passengers])


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

                {
                    selectedBooking &&

                    <Stack spacing={2}>
                        <TripDetails tripData={selectedBooking.selectedFlight} />
                        <PassengerDetails passengers={passengers} setPassengers={setPassengers} />

                    </Stack>
                }

                <Stack spacing={2}>
                    <FareSummary price={selectedBooking.selectedFlight.price} travellers={{
                        adults: searchCriteria.adults,
                        children: searchCriteria.children,
                        infants: searchCriteria.infants,
                    }}
                    />
                    <DiscountForm />

                    <StripePayment price={120} />

                </Stack>

            </Stack>
            <Footer />

        </Stack >
    )
}

export default FlightDetails