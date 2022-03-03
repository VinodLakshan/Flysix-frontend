import React from 'react'
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from './userRedux'

const rootReducer = combineReducers({ user: userReducer });
const store = configureStore({
    reducer: rootReducer
});

export default store