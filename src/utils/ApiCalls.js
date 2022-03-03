import axios from "axios";
import { authFailure, authStart, authSuccess } from "../redux/userRedux"
import { Properties } from './../Properties'

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

