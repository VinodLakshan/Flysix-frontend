import React, { useEffect } from 'react'
import { Stack } from '@mui/material';
import FlightResult from './FlightResult';
import { useSelector } from 'react-redux';


const SearchResults = () => {

    const { filteredFlightList } = useSelector(state => state.flight);

    return (
        <Stack spacing={2} sx={{ width: { md: "60vw" }, maxWidth: 900 }}>
            {filteredFlightList &&
                filteredFlightList.map((flight) => {
                    return <FlightResult key={flight.id} flight={flight} />
                })
            }
        </Stack>
    )
}

export default SearchResults