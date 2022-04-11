import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            currentUser: null,
            token: null,
            isFetching: false,
            selectedBooking: null,
            error: false
        },
        reducers: {
            authStart: (state) => {
                state.isFetching = true;
            },
            authSuccess: (state, action) => {
                state.isFetching = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
            },
            authFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
            authFetchingDone: (state) => {
                state.isFetching = false;
            },
            logout: (state) => {
                state.currentUser = null;
                state.token = null;
            },
            updateSelectedBooking: (state, action) => {
                state.selectedBooking = action.payload;
            },
            updatePassengers: (state, action) => {
                state.selectedBooking.passengers = action.payload;
            },
            reservationSuccess: (state, action) => {
                state.isFetching = false;
                state.selectedBooking = action.payload
            },
            paymentSuccess: (state) => {
                state.isFetching = false;
            },
            clearSelectedBooking: (state) => {
                state.selectedBooking = null;
            }
        }
    }
);

export const { authStart, authSuccess, authFailure, logout,
    updateSelectedBooking, updatePassengers, reservationSuccess, paymentSuccess, clearSelectedBooking, authFetchingDone } = userSlice.actions;
export default userSlice.reducer;