import { LocalAtmRounded } from '@mui/icons-material'
import { Alert, Chip, Divider, Paper, Stack, styled, Typography } from '@mui/material'
import { borderRadius, Box } from '@mui/system'
import React from 'react'
import { Const } from '../Properties'

const CDivider = styled(Divider)(() => ({
    marginBottom: 10,
    marginTop: 10
}))


const FareSummary = ({ price, travellers }) => {

    return (
        <Paper elevation={5}
            sx={{
                borderRadius: 2,
                width: { md: "20vw" },
                maxWidth: { xs: 800, md: 300 },
                minWidth: 285,
                maxHeight: 390
            }}>
            <Stack justifyContent="center" spacing={2} sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                    <LocalAtmRounded />
                    <Typography variant="h6">Fare Summary</Typography>
                </Stack>
                <CDivider sx={{ backgroundColor: 'primary.main' }} />

                <Chip label={`Travellers: ${travellers.adults} ${Const.Adult}, 
                ${travellers.children} ${Const.Child}, ${travellers.infants}  ${Const.Infant}`}
                    variant="outlined" />

                <Divider />
                <Stack direction="row" px={1} justifyContent="space-between" spacing={1}>
                    <Box>
                        <Typography variant="body1">Fare</Typography>
                        <Typography variant='body2'>Base fare & taxes</Typography>
                    </Box>
                    <Typography variant="subtitle1">{price.currency} {price.total}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" px={1} justifyContent="space-between" alignItems="center" spacing={1}>
                    <Typography variant="body1">Booking Fee</Typography>
                    <Typography variant="body1">{price.currency} 0</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" px={1} justifyContent="space-between" alignItems="flex-end" spacing={1}>
                    <Box>
                        <Typography variant="body1">Promotions</Typography>
                        <Typography variant='body2'>10% member discount</Typography>
                    </Box>
                    <Typography variant="subtitle1">{price.currency} 0</Typography>
                </Stack>

            </Stack>

            <Box
                sx={{
                    backgroundColor: "primary.main",
                    width: "100%", height: 50,
                    borderRadius: "0 0 12px 12px"
                }}>
                <Stack direction="row" px={2.5} py={1.25} justifyContent="space-between" alignItems="center" spacing={1}
                    style={{ color: "white" }}
                >
                    <Typography variant="h6">Grand Total</Typography>
                    <Typography variant="h6">{price.currency} {price.total}</Typography>
                </Stack>
            </Box>
        </Paper>
    )
}

export default FareSummary