import { Button, Grid, Modal, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FlightFilters from '../components/FlightFilters'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import SearchFlights from '../components/SearchFlights'
import SearchResults from '../components/SearchResults'

const FlightResult = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack
            direction="column"
            alignItems='center'
        >
            <PageHeader />
            <Grid container rowSpacing={2} sx={{
                mt: 2,
                px: { xs: 2, md: 8 }
            }}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: "center",
                }}>
                    <SearchFlights type="hr" />
                </Grid>

                <Grid item md={4} sx={{ display: { md: 'flex', xs: 'none' } }}>
                    <FlightFilters />
                </Grid>

                <Grid item xs={1} sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <Button variant="contained" onClick={handleOpen}>Filters</Button>
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
                </Grid>
                <Grid item xs={8}>
                    <SearchResults />
                </Grid>
            </Grid>
            <Footer />

        </Stack>
    )
}

export default FlightResult