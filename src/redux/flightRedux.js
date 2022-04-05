import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice(
    {
        name: "flight",
        initialState: {
            searchCriteria: null,
            filteredFlightList: [],
            isFetching: false,
            error: false
        },
        reducers: {
            fetchingStart: (state) => {
                state.isFetching = true;
            },
            fetchingDone: (state) => {
                state.isFetching = false;
            },
            fetchingSuccess: (state, action) => {
                state.isFetching = false;
                state.searchCriteria = action.payload
            },
            fetchError: (state) => {
                state.isFetching = false;
                state.error = true;
            },
            updateFilteredFlightList: (state, action) => {
                state.filteredFlightList = action.payload;
            },
            clearFlightData: (state) => {
                state.searchCriteria = null;
                state.filteredFlightList = [];
            }

        }
    }
);

export const { fetchingStart, fetchingSuccess, fetchError, updateFilteredFlightList, clearFlightData, fetchingDone } = flightSlice.actions;
export default flightSlice.reducer;