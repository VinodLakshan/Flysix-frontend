import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../theme/animate';
import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Const } from '../Properties';
import { useDispatch } from 'react-redux'
import { clearSelectedBooking } from '../redux/userRedux';
import { clearFlightData } from '../redux/flightRedux';

const SuccessPayment = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [type, setType] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    const [searchParams] = useSearchParams();

    const clearData = () => {
        dispatch(clearSelectedBooking());
        dispatch(clearFlightData());
    }

    useEffect(() => {

        setBookingId(searchParams.get("bookingId"));
        setType(searchParams.get("type"))
        clearData();

    }, [])


    return (
        <Stack sx={{ backgroundColor: "white", minHeight: "100vh" }}>
            <PageHeader />
            <Container sx={{
                py: 2,
                flex: 1
            }}>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                            {
                                type === Const.Confirmed &&

                                <Typography variant="h3" paragraph>
                                    Great! Your Booking is confirmed!
                                </Typography>
                            }

                            {
                                type === Const.Unconfirmed &&

                                <Typography variant="h3" paragraph>
                                    Great! Your Booking is on hold!
                                </Typography>
                            }

                        </motion.div>
                        {
                            (type === Const.Confirmed && bookingId) &&

                            <Typography sx={{ color: 'text.secondary' }}>
                                Reservation details for the booking number <u><b>{bookingId}</b></u> will be shortly received via email. Have a nice day!
                            </Typography>
                        }

                        {
                            (type === Const.Unconfirmed && bookingId) &&

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
    )
}

export default SuccessPayment