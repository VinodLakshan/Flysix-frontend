import axios from "axios";
import { authFailure, authStart, authSuccess } from "../redux/userRedux"
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
        const data = res.data.user;
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