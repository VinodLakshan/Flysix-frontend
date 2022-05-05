import { LoadingButton } from '@mui/lab'
import { Alert, Paper, Snackbar, Stack, TextField, Box } from '@mui/material'
import React from 'react'
import DiscountForm from '../components/DiscountForm'
import FareSummary from '../components/FareSummary'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import PassengerDetails from '../components/PassengerDetails'
import TripDetails from '../components/TripDetails'
import { MotionContainer, varBounceIn } from '../theme/animate'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import { findUnconfirmedOnHoldBooking, createPaymentSession } from '../utils/ApiCalls'
import { Const, Currencies } from '../Properties'

const ConfirmOnHoldBookings = () => {

    const { token } = useSelector(state => state.user);
    const { isFetching } = useSelector(state => state.flight);
    const [alertError, setAlertError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [bookingId, setBookingId] = React.useState("");
    const [booking, setBooking] = React.useState(null);
    const [travellers, setTravellers] = React.useState({
        adults: 0,
        children: 0,
        infants: 0
    });
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const dispatch = useDispatch();

    const setTravellersCount = () => {

        const travellersCount = {
            adults: 0,
            children: 0,
            infants: 0
        }

        booking.passengers.forEach((pass) => {
            if (pass.type === Const.Adult) travellersCount.adults++
            if (pass.type === Const.Child) travellersCount.children++
            if (pass.type === Const.Infant) travellersCount.infants++
        })

        setTravellers(travellersCount)
    }

    const handleFindBooking = async () => {

        if (bookingId !== "") {

            setBooking(null);
            const res = await findUnconfirmedOnHoldBooking(dispatch, token, bookingId);
            switch (res.status) {

                case 200:
                    res.data.payment.symbol = Currencies[res.data.payment.currency].symbol;
                    setBooking(res.data);
                    break;

                default:
                    setAlertError(res.error);
                    setShowErrorAlert(true);
                    break;
            }
        }
    }

    const setUpPayment = () => {
        return {
            bookingId: booking.bookingId,
            currency: booking.payment.currency,
            price: booking.payment.total,
            successUrl: "http://localhost:3000/successPayment",
            cancelUrl: "http://localhost:3000/confirmBooking"
        }

    }

    const handlePayment = async () => {

        setIsLoading(true);
        const payRes = await createPaymentSession(dispatch, token, setUpPayment());

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
    }

    React.useEffect(() => {

        if (booking) setTravellersCount();

    }, [booking])


    return (
        <Stack
            direction="column"
            alignItems='center'
            spacing={4}
            sx={{ bgcolor: "white", minHeight: "100vh" }}
        >
            <PageHeader />

            <Paper elevation={5}
                sx={{
                    bgcolor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: 2,
                    maxWidth: 800,

                }}
            >
                <Stack
                    direction={{ sm: "row", xs: "column" }}
                    spacing={2}
                    sx={{ m: 2 }}
                >
                    <TextField required
                        sx={{ minWidth: 300 }}
                        fullWidth
                        onChange={(e) => setBookingId(e.target.value)}
                        label="Booking ID"
                        id="booking-id"
                        name="bookingId"
                        size="small"
                    />

                    <LoadingButton
                        color="primary"
                        onClick={handleFindBooking}
                        loading={isFetching}
                        variant="contained"
                    >
                        Find
                    </LoadingButton>
                </Stack>

            </Paper >

            {
                !booking &&

                <MotionContainer initial="initial" open sx={{ flex: 1 }}>
                    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/illustrations/find.jpg"
                                sx={{ height: 250, mx: 'auto', my: 8 }}
                            />
                        </motion.div>
                    </Box>
                </MotionContainer>
            }

            {
                booking &&

                <Stack direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ px: 2 }}
                >


                    <Stack spacing={2}>
                        <TripDetails tripData={booking.flight} />
                        <PassengerDetails passengers={booking.passengers}
                            setPassengers={(pass) => setBooking({ ...booking, passengers: pass })}
                            passengerEditable={false}
                        />

                    </Stack>

                    {
                        <Stack spacing={2}>
                            <FareSummary price={booking.payment} travellers={travellers}
                            />
                            <DiscountForm />

                            <LoadingButton
                                color="primary"
                                fullWidth
                                onClick={handlePayment}
                                loading={isLoading}
                                variant="contained"
                            >
                                Continue to Pay
                            </LoadingButton>

                        </Stack>
                    }

                </Stack>
            }

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar >

            <Footer />

        </Stack >
    )
}

export default ConfirmOnHoldBookings