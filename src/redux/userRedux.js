import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            currentUser: null,
            isFetching: false,
            selectedBooking: {},
            error: false
        },
        reducers: {
            authStart: (state) => {
                state.isFetching = true;
            },
            authSuccess: (state, action) => {
                state.isFetching = false;
                state.currentUser = action.payload
            },
            authFailure: (state) => {
                state.isFetching = false;
                state.error = true;
            },
            logout: (state) => {
                state.currentUser = null;
            },
            updateSelectedBooking: (state, action) => {
                state.selectedBooking = action.payload;
            },
            updatePassengers: (state, action) => {
                state.selectedBooking.passengers = action.payload;
            }
        }
    }
);

export const { authStart, authSuccess, authFailure, logout, updateSelectedBooking, updatePassengers } = userSlice.actions;
export default userSlice.reducer;