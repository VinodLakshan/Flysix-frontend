import { Grid, styled, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-grid-carousel'
import { topDestinations } from '../Data'

const City = styled('div')((props) => ({

    backgroundImage: `url(${props.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '220px',
    lineHeight: '220px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    margin: '7px',
    boxShadow: '0 0 2px 0 #666',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'transform 0.25s',
    boxShadow: '0.25s',

    '&: hover': {
        transform: ' translateY(-5px)',
        boxShadow: '0 5px 5px 0 #666'
    }
}))

const TopDestinations = () => {
    return (
        <Grid container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
                m: 2,
                mt: 4
            }}
        >
            <Grid item sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column"
            }}>
                <Typography variant="h3" component="div">
                    TOP DESTINATIONS
                </Typography>
                <Typography variant="body1" component="div" sx={{ pb: 4, p: { xs: 2 }, fontSize: { xs: 16, sm: 20 } }}>
                    Discover most popular attractions and activities for your next adventure...
                </Typography>
            </Grid>

            <Grid item
                sx={{ maxWidth: '90vw' }}
            >
                <Carousel cols={4} rows={1} gap={10} loop mobileBreakpoint={900}>
                    {topDestinations.map((city) => (
                        <Carousel.Item key={city.id}>
                            <City img={city.img}>{city.city}</City>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Grid>
        </Grid >
    )
}

export default TopDestinations