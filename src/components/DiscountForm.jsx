import { LocalOffer } from '@mui/icons-material'
import { Button, Divider, Paper, Stack, styled, TextField, Typography } from '@mui/material'
import React from 'react'

const CDivider = styled(Divider)(() => ({
    marginBottom: 10,
    marginTop: 10
}))

const DiscountForm = () => {
    return (
        <Paper elevation={5}
            sx={{
                borderRadius: 2,
                width: { md: "20vw" },
                maxWidth: { xs: 800, md: 300 },
                minWidth: 285,
            }}>
            <Stack justifyContent="center" spacing={2} sx={{ p: 2 }}>
                <Stack direction="row" spacing={1}>
                    <LocalOffer />
                    <Typography variant="h6">Apply Discount</Typography>
                </Stack>
                <CDivider sx={{ backgroundColor: 'primary.main' }} />

                <Typography variant="body2">Radeem your promo code here!</Typography>

                <Stack direction="row" spacing={1}>
                    <TextField required
                        fullWidth
                        label="Discount Code"
                        id="discount-code"
                        size="small"
                    />
                    <Button variant="outlined">
                        Apply
                    </Button>
                </Stack>
            </Stack>

        </Paper>
    )
}

export default DiscountForm