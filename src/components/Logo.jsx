import { Box } from '@mui/system'
import React from 'react'

const Logo = ({ size }) => {
    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                p: 1,
                pt: 2,
                m: 1,
            }}

        >
            <img src='/static/illustrations/Flysix-logo.png' alt='logo' width={size === 'md' ? "180px" : "120px"}
            />
        </Box>
    )
}

export default Logo