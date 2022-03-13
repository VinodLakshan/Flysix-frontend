import { Button, Grid, Modal, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FlightFilters from '../components/FlightFilters'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import SearchFlights from '../components/SearchFlights'
import SearchResults from '../components/SearchResults'

const FlightSearchResult = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack
            direction="column"
            alignItems='center'
            spacing={4}
        >
            <PageHeader />
            <Box sx={{ px: 2 }}>
                <SearchFlights type="hr" />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2} sx={{ px: 2 }}>

                <Box sx={{ display: { md: 'flex', xs: 'none' } }} >
                    <FlightFilters />
                </Box>
                <Stack direction="row" alignItems="center" sx={{ display: { md: 'none', xs: 'flex' }, pl: 2 }}>
                    <Button variant="contained" onClick={handleOpen}>Filters</Button>
                    <Typography variant="body2" sx={{ pl: 2 }}> 21 of 50 results</Typography>
                    <Modal
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box>
                            <FlightFilters />
                        </Box>
                    </Modal>
                </Stack>

                <Box sx={{ px: 2 }}>
                    <SearchResults />
                </Box>
            </Stack>
            <Footer />

        </Stack >
    )
}

export default FlightSearchResult