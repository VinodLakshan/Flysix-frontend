import axios from "axios";
import { authFailure, authFetchingDone, authStart, authSuccess, paymentSuccess, reservationSuccess } from "../redux/userRedux"
import { fetchingStart, fetchingSuccess, fetchError, fetchingDone } from "../redux/flightRedux"
import { Properties, Trips } from './../Properties'
import { testRes } from './../Data'
import qs from 'qs';

// ================================ Auth ============================================================

export const login = async (dispatch, user) => {

    return await sendAuth(dispatch, user, "login")
}

export const register = async (dispatch, user) => {

    user = { ...user, role: { roleId: 1 } }
    return await sendAuth(dispatch, user, "register")
}

const sendAuth = async (dispatch, user, method) => {
    dispatch(authStart());

    try {
        const res = await axios.post(`${Properties.backendUrl}/auth/${method}`, user);
        const data = res.data;
        dispatch(authSuccess(data));
        return { status: res.status }

    } catch (err) {

        dispatch(authFailure());
        return err.response.data
    }
}

// ================================== User ============================================================

export const updateUser = async (dispatch, token, user) => {

    user = { ...user, role: { roleId: 1 } }
    dispatch(authStart());

    try {
        const res = await axios.put(`${Properties.backendUrl}/user`, user, {
            headers: {
                'Authorization': `${token}`
            },
        });

        const data = res.data;
        dispatch(authSuccess(data));
        return { status: res.status }

    } catch (err) {
        dispatch(authFailure());
        return err.response.data
    }
}


// ================================ Flight ============================================================

export const findFlights = async (dispatch, searchCriteria) => {

    dispatch(fetchingStart())
    try {
        const accessRes = await getAccessToken();

        if (accessRes.status === 200) {

            let findFlightUrl = Properties.findFlightsBaseUrl +
                "?originLocationCode=" + searchCriteria.origin.id +
                "&destinationLocationCode=" + searchCriteria.destination.id +
                "&departureDate=" + searchCriteria.departDate +
                "&adults=" + searchCriteria.adults +
                "&children=" + searchCriteria.children +
                "&infants=" + searchCriteria.infants +
                "&travelClass=" + searchCriteria.bookingClass.toUpperCase() +
                "&currencyCode=" + searchCriteria.currency.code.toUpperCase() +
                // "&currencyCode=" + searchCriteria.currency +
                "&max=10";

            if (searchCriteria.trip === Trips.round)
                findFlightUrl += "&returnDate=" + searchCriteria.returnDate;


            const flightRes = await axios.get(findFlightUrl, {
                headers: {
                    "Authorization": "Bearer " + accessRes.data.access_token
                }
            })

            dispatch(fetchingSuccess(searchCriteria));
            return { status: 200, data: flightRes.data };


        } else {
            dispatch(fetchError())
            return accessRes;
        }

    } catch (err) {
        dispatch(fetchError())
        console.log("Flight search error : ");
        console.log(err.response.data.errors[0].detail);
        console.log(err.response.data.errors[0].source);

        return {
            status: err.response.status,
            error: err.response.data.errors[0].title
        };
    }

    // dispatch(fetchingSuccess(searchCriteria));
    // return { status: 200, data: testRes };
}

const getAccessToken = async () => {

    const accessData = {
        grant_type: "client_credentials",
        client_id: Properties.flightClientId,
        client_secret: Properties.flightClientSecret
    }

    try {
        const res = await axios.post(Properties.flightTokenUrl, qs.stringify(accessData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        return { data: res.data, status: res.status };

    } catch (err) {
        console.log("Flight token error : " + err.response.data.error_description)
        return err.response.data;
    }

}

// ================================ Booking ============================================================

export const saveReservation = async (dispatch, token, reservationDetails) => {

    dispatch(authStart());

    try {

        const res = await axios.post(`${Properties.backendUrl}/booking`, reservationDetails, {
            headers: {
                'Authorization': `${token}`
            },
        });

        dispatch(reservationSuccess(reservationDetails));
        return { data: res.data, status: res.status }

    } catch (err) {
        dispatch(authFailure());
        return err.response.data
    }
}

export const createPaymentSession = async (dispatch, token, paymentDetails) => {

    dispatch(authStart());

    try {

        const res = await axios.post(`${Properties.backendUrl}/payment/paymentSession`, paymentDetails, {
            headers: {
                'Authorization': `${token}`
            },
        });

        dispatch(paymentSuccess());
        return { data: res.data, status: res.status }

    } catch (err) {
        dispatch(authFailure());
        return err.response.data
    }
}

export const findMyReservations = async (dispatch, token, userId) => {

    dispatch(authStart())
    try {

        const res = await axios.get(`${Properties.backendUrl}/booking/byUser/${userId}`, {
            headers: {
                'Authorization': `${token}`
            },
        });

        dispatch(authFetchingDone());
        return { data: res.data, status: res.status }

    } catch (err) {
        dispatch(authFailure());
        return err.response.data
    }
}

export const findUnconfirmedOnHoldBooking = async (dispatch, token, bookingId) => {

    dispatch(fetchingStart());

    try {

        const res = await axios.get(`${Properties.backendUrl}/booking/unconfirmedOnHolds/${bookingId}`, {
            headers: {
                'Authorization': `${token}`
            },
        });
        dispatch(fetchingDone());
        return { data: res.data, status: res.status }

    } catch (err) {
        dispatch(fetchError());
        return err.response.data
    }
}