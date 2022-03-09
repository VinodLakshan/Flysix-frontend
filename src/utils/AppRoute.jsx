import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import FlightResult from '../views/FlightResult';

const AppRoute = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/flightResults" element={<FlightResult />} />
            </Routes>
        </Router>
    )
}

export default AppRoute