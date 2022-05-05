import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import PageHeader from '../components/PageHeader'
import SearchFlights from '../components/SearchFlights'
import TopDestinations from '../components/TopDestinations'

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
                    alignItems: { xs: 'center', md: 'flex-start' },
                }}
            >

                <Typography variant="h3" sx={{ pb: 2 }} color={'primary.main'}>
                    Let's find a flight!

                </Typography>

                <SearchFlights type="vt" />
            </Box>
            <TopDestinations />
            <Newsletter />
            <Footer />
        </Stack >
    )
}

export default Home