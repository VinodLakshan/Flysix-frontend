import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Newsletter = () => {
    return (
        <Paper elevation={5}
            sx={{
                bgcolor: 'white',
                borderRadius: 2,
                maxWidth: 900,
                m: 4,
                py: 2,
                px: { xs: 2 }
            }}
        >

            <Grid container columnSpacing={1} rowSpacing={1}>

                <Grid item sm={4} xs={12} >
                    <img src="/static/illustrations/5b59858b5e43896f2df253ac_airplane-animation.gif" alt="Newsletter" width="100%" />
                </Grid>
                <Grid item sm={8} xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                }}>
                    <Typography variant="h5" component="div" sx={{ pb: 1 }}>
                        Get notified about latest deals!
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ fontSize: 16 }}>
                        Sign up for access to personalized recommendations and Private Deals...
                    </Typography>
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        sx={{ pb: 2, width: { sm: '60%', xs: '80%' } }}
                    />
                    <Button variant="outlined" href="/login" >Count me in!</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Newsletter