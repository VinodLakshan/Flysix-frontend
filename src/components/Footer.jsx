import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{
            position: 'relative',
            bottom: 0,
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            bgcolor: 'primary.main'
        }}>
            <Typography variant="paragraph" sx={{ color: 'white', pt: 1 }}>©FlySix. All rights reserved.</Typography>
        </Box >
    )
}

export default Footer