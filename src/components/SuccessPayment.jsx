import { Alert, Backdrop, Box, Button, CircularProgress, Container, Snackbar, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../theme/animate';
import React, { useEffect, useState } from 'react'
import PageHeader from './PageHeader';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Const } from '../Properties';
import { makePaymentConfirm } from '../utils/ApiCalls';
import { useDispatch } from 'react-redux'
import { clearSelectedBooking } from '../redux/userRedux';
import { clearFlightData } from '../redux/flightRedux';

const SuccessPayment = () => {


    const [alertError, setAlertError] = React.useState("");
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookingType, setBookingType] = useState(null);
    let { bookingId } = useParams();

    const { selectedBooking, token } = useSelector(state => state.user);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const clearData = () => {
        dispatch(clearSelectedBooking());
        dispatch(clearFlightData());
    }

    useEffect(() => {

        setBookingType(selectedBooking.bookingType);

        const confirmPayment = async () => {
            const payRes = await makePaymentConfirm(token, bookingId);

            switch (payRes.status) {

                case 200:
                    setOpenBackdrop(false);
                    clearData();
                    break;

                default:
                    setAlertError(payRes.error);
                    setShowErrorAlert(true);
                    break;
            }

        }

        if (selectedBooking.bookingType === Const.Instant) {
            setOpenBackdrop(true);
            confirmPayment();

        } else {
            clearData();
        }



        // send notification

    }, [])


    return (
        <Box sx={{ backgroundColor: "white" }}>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="primary" />
            </Backdrop>

            {
                !openBackdrop &&

                <Stack>
                    <PageHeader />
                    <Container sx={{
                        py: 2
                    }}>
                        <MotionContainer initial="initial" open>
                            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                                <motion.div variants={varBounceIn}>
                                    {
                                        bookingType === Const.Instant &&

                                        <Typography variant="h3" paragraph>
                                            Great! Your Booking is confirmed!
                                        </Typography>
                                    }

                                    {
                                        bookingType === Const.HoldForFree &&

                                        <Typography variant="h3" paragraph>
                                            Great! Your Booking is on hold!
                                        </Typography>
                                    }

                                </motion.div>
                                {
                                    (bookingType === Const.Instant && bookingId) &&

                                    <Typography sx={{ color: 'text.secondary' }}>
                                        Reservation details for the booking number <u><b>{bookingId}</b></u> will be shortly received via email. Have a nice day!
                                    </Typography>
                                }

                                {
                                    (bookingType === Const.HoldForFree && bookingId) &&

                                    <Typography sx={{ color: 'text.secondary' }}>
                                        Please make the payment for the booking number <u><b>{bookingId}</b></u> within 2 days to confirm your booking. Have a nice day!
                                    </Typography>
                                }


                                <motion.div variants={varBounceIn}>
                                    <Box
                                        component="img"
                                        src="/static/illustrations/success.gif"
                                        sx={{ height: 250, mx: 'auto', my: 8 }}
                                    />
                                </motion.div>

                                <Button onClick={() => navigate("/")} size="large" variant="contained">
                                    Go to Home
                                </Button>
                            </Box>
                        </MotionContainer>

                    </Container>
                    <Footer />
                </Stack>
            }

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar>

        </Box>
    )
}

export default SuccessPayment