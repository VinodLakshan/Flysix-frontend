import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import PageHeader from '../components/PageHeader'
import SearchFlights from '../components/SearchFlights'

const Home = () => {
    return (
        <Stack
            direction="column"
            alignItems='center'
        >

            <PageHeader />
            <Box
                sx={{
                    mx: { xs: 2, md: 0 },
                    mt: { xs: 2, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' }
                }}
            >

                <Typography variant="h3" sx={{ pb: 2 }} color={'primary.main'}>
                    Let's find a flight!

                </Typography>

                <SearchFlights />
            </Box>
        </Stack >
    )
}

export default Home