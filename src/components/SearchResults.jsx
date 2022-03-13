import React from 'react'
import { Paper, Stack } from '@mui/material';
import FlightResult from './FlightResult';


const SearchResults = () => {
    return (
        <Stack spacing={2} sx={{ width: { md: "60vw" }, maxWidth: 900 }}>
            <FlightResult />
            <FlightResult />
        </Stack>
    )
}

export default SearchResults