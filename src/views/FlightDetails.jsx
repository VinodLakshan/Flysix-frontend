import { Alert, Snackbar, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DiscountForm from '../components/DiscountForm'
import FareSummary from '../components/FareSummary'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PassengerDetails from '../components/PassengerDetails'
import TripDetails from '../components/TripDetails'
import { updatePassengers, updateSelectedBooking } from '../redux/userRedux'
import { Const } from '../Properties'
import { LoadingButton } from '@mui/lab'
import { saveReservation, makePayment } from '../utils/ApiCalls'

const FlightDetails = () => {

    const { selectedBooking, token } = useSelector(state => state.user);
    const { searchCriteria } = useSelector(state => state.flight);
    const [passengers, setPassengers] = React.useState([]);
    const [alertError, setAlertError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setUpPayment = (bookingId) => {
        return {
            bookingId: bookingId,
            currency: selectedBooking.payment.currency,
            price: selectedBooking.payment.total,
            successUrl: `http://localhost:3000/successPayment/${bookingId}`,
            cancelUrl: "http://localhost:3000/passenger"
        }

    }

    const handlePayment = async () => {

        setIsLoading(true);
        const res = await saveReservation(dispatch, token, selectedBooking);

        switch (res.status) {
            case 200:

                dispatch(updateSelectedBooking(res.data));

                if (selectedBooking.bookingType === Const.Instant) {

                    const payRes = await makePayment(dispatch, token, setUpPayment(res.data.bookingId));

                    switch (payRes.status) {

                        case 200:
                            window.location.href = payRes.data.paymentUrl;
                            // setIsLoading(false);
                            break;

                        default:
                            setIsLoading(false);
                            setAlertError(payRes.error);
                            setShowErrorAlert(true);
                            break;
                    }
                } else {
                    // hold for free
                    window.location.href = `http://localhost:3000/successPayment/${res.data.bookingId}`;
                    // setIsLoading(false);
                };
                break;

            default:
                setIsLoading(false);
                setAlertError(res.error);
                setShowErrorAlert(true);
                break;
        }

    }

    useEffect(() => {

        if (!selectedBooking.flight || !selectedBooking.reservedBy) {
            navigate("/")

        } else {
            if (passengers.length === 0 && selectedBooking.passengers) {
                setPassengers(selectedBooking.passengers);

            } else {
                dispatch(updatePassengers(passengers))
            }
        }



    }, [passengers])


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
                        <TripDetails tripData={selectedBooking.flight} />
                        <PassengerDetails passengers={passengers} setPassengers={setPassengers} />

                    </Stack>
                }

                <Stack spacing={2}>
                    <FareSummary price={selectedBooking.payment} travellers={{
                        adults: searchCriteria.adults,
                        children: searchCriteria.children,
                        infants: searchCriteria.infants,
                    }}
                    />
                    <DiscountForm />

                    <LoadingButton
                        color="primary"
                        fullWidth
                        onClick={handlePayment}
                        loading={isLoading}
                        variant="contained"
                    // sx={{ mt: 2, mb: 2 }}
                    >
                        {selectedBooking.bookingType === Const.Instant && `Continue to Pay`}
                        {selectedBooking.bookingType === Const.HoldForFree && `Confirm Booking`}
                    </LoadingButton>

                </Stack>

            </Stack>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar>

            <Footer />

        </Stack >
    )
}

export default FlightDetails