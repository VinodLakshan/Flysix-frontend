import { Alert, Box, Snackbar, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import ReservationsTable from '../components/ReservationsTable'
import ReservationFilters from '../components/ReservationFilters'
import { findMyReservations } from '../utils/ApiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Const } from '../Properties'
import { fil } from 'date-fns/locale'

const MyReservations = () => {

    const [myReservations, setMyReservations] = useState([]);
    const [rows, setRows] = useState([]);
    const [filters, setFilters] = useState({
        trip: Const.All,
        class: Const.All,
        status: Const.All
    });
    const [alertError, setAlertError] = React.useState("");
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);

    const { token, currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const convertToRows = (bookings) => {

        const convertedBookings = bookings.map(booking => {
            return {
                reservationId: booking.bookingId,
                bookingClass: booking.bookingClass,
                trip: booking.trip,
                origin: booking.flight.departTrip.origin.label,
                destination: booking.flight.departTrip.destination.label,
                payment: `${booking.payment.currency} ${booking.payment.total}`,
                status: booking.status
            };
        })

        setMyReservations(convertedBookings)
        setRows(convertedBookings);

    }

    const applyFilters = () => {

        setRows(myReservations.filter(reservation => {

            let isMatching = true;

            if (filters.trip !== Const.All && filters.trip !== reservation.trip)
                isMatching = false;

            if (filters.class !== Const.All && filters.class !== reservation.bookingClass)
                isMatching = false;

            if (filters.status !== Const.All && filters.status !== reservation.status)
                isMatching = false;

            return isMatching;
        }));

    }

    useEffect(() => {

        const findReservations = async () => {

            const res = await findMyReservations(dispatch, token, currentUser.userId);

            switch (res.status) {

                case 200:
                    convertToRows(res.data);
                    break;

                default:
                    setAlertError(res.error);
                    setShowErrorAlert(true);
                    break;
            }
        }

        findReservations();

    }, [])


    return (
        <Stack
            spacing={4}
            sx={{
                backgroundColor: "white",
                minHeight: "100vh"
            }}
        >
            <PageHeader />
            <Stack
                alignItems={{ sm: "center" }}
                sx={{
                    m: 2,
                    px: 2,
                    flex: 1
                }}>
                <ReservationFilters filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
                <ReservationsTable rows={rows} />
            </Stack>
            <Footer />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity="error" sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar>
        </Stack>

    )
}

export default MyReservations