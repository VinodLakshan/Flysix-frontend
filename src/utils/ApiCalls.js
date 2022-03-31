import axios from "axios";
import { authFailure, authStart, authSuccess, paymentSuccess, reservationSuccess } from "../redux/userRedux"
import { fetchingStart, fetchingSuccess, fetchError } from "../redux/flightRedux"
import { Properties } from './../Properties'
import { testRes } from './../Data'

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

// ================================ Flight ============================================================

export const findFlights = async (dispatch, searchCriteria) => {

    dispatch(fetchingStart())

    try {

        dispatch(fetchingSuccess(searchCriteria));
        return { status: 200, data: testRes };

    } catch (ex) {
        dispatch(fetchError())
        return { status: 400, error: "this is the error" };
    }
}

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

export const makePayment = async (dispatch, token, paymentDetails) => {

    dispatch(authStart());

    try {

        const res = await axios.post(`${Properties.backendUrl}/payment`, paymentDetails, {
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

export const makePaymentConfirm = async (token, bookingId) => {

    try {

        const res = await axios.get(`${Properties.backendUrl}/payment/confirm/${bookingId}`, {
            headers: {
                'Authorization': `${token}`
            },
        });

        return { data: res.data, status: res.status }

    } catch (err) {
        return err.response.data
    }
}