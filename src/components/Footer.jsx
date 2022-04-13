import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{
            position: "static",
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'primary.main'
        }}>
            <Typography variant="paragraph" sx={{ color: 'white', pt: 1 }}>©FlySix. All rights reserved.</Typography>
        </Box >
    )
}

export default Footer