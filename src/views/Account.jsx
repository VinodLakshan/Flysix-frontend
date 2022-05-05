import { Alert, Avatar, Box, Grid, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import MuiPhoneNumber from 'material-ui-phone-number'
import { LoadingButton } from '@mui/lab'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../utils/ApiCalls'

const Account = () => {

    const [updatedUser, setUpdatedUser] = useState({
        userId: '',
        name: '',
        username: '',
        email: '',
        address: '',
        mobileNo: '',
        password: '',
        conPassword: ''
    });
    const { currentUser, isFetching, token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [alertError, setAlertError] = React.useState("");
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [alertType, setAlertType] = useState("error");

    const handleUpdateUser = async () => {

        if (updatedUser.name && updatedUser.password && updatedUser.email && updatedUser.address &&
            updatedUser.mobileNo && updatedUser.password && updatedUser.conPassword) {

            if (updatedUser.password === updatedUser.conPassword) {

                const res = await updateUser(dispatch, token, updatedUser);

                if (res.status === 200) {
                    setAlertError("User updated successfully!");
                    setAlertType("success");
                    setShowErrorAlert(true);

                } else {
                    setAlertError(res.error);
                    setAlertType("error");
                    setShowErrorAlert(true);
                }

            } else {
                setAlertError("Passwords mismatched!");
                setAlertType("error");
                setShowErrorAlert(true);
            }

        } else {
            setAlertError("Please fill the required fields.");
            setAlertType("error");
            setShowErrorAlert(true);
        }
    }

    useEffect(() => {
        setUpdatedUser(currentUser)

    }, [currentUser])


    return (
        <Stack sx={{ backgroundColor: "white", minHeight: "100vh" }}>
            <PageHeader />

            <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ mt: { xs: 3, sm: 0 } }}>
                    Account Details
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} sx={{ p: 2 }}
                    alignItems={{ sm: "flex-start", xs: "center" }} justifyContent="center" spacing={6}
                >

                    <Paper elevation={5}
                        sx={{
                            display: "flex",
                            borderRadius: 3,
                            width: { sm: 410, xs: "80%" },
                            height: { sm: 410, xs: 200 },
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/mock-images/avatars/avatar_default.jpg"
                            sx={{ width: 150, height: 150 }}
                        />

                    </Paper>

                    <Paper elevation={5}
                        sx={{
                            display: "flex",
                            borderRadius: 3,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <Stack
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxWidth: "400px",

                            }}
                        >

                            <Box component="form" noValidate sx={{ p: 2 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoComplete="name"
                                            autoFocus
                                            size="small"
                                            value={updatedUser.name}
                                            onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                        />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            size="small"
                                            value={updatedUser.username}
                                            disabled
                                            onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                        />
                                    </Grid>

                                </Grid>

                                <TextField
                                    type="email"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    size="small"
                                    value={updatedUser.email}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    size="small"
                                    value={updatedUser.address}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                />

                                <MuiPhoneNumber
                                    margin="normal"
                                    required
                                    disableAreaCodes
                                    fullWidth
                                    name="mobileNo"
                                    variant="outlined"
                                    label="Mobile Number"
                                    countryCodeEditable={false}
                                    defaultCountry={'us'}
                                    size="small"
                                    value={updatedUser.mobileNo}
                                    onChange={(e) => setUpdatedUser({ ...updatedUser, "mobileNo": e })}
                                />

                                <Grid container spacing={1}>
                                    <Grid item xs={6}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            size="small"
                                            onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                        />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="conPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="passconPasswordword"
                                            size="small"
                                            onChange={(e) => setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })}
                                        />
                                    </Grid>

                                </Grid>

                                <LoadingButton
                                    color="primary"
                                    fullWidth
                                    onClick={handleUpdateUser}
                                    endIcon={<Create />}
                                    loading={isFetching}
                                    loadingPosition="end"
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                    size="small"
                                >
                                    Save Changes
                                </LoadingButton>

                            </Box>
                        </Stack>

                    </Paper>

                </Stack>
            </Stack>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showErrorAlert} autoHideDuration={6000} onClose={() => setShowErrorAlert(false)}>
                <Alert variant="filled" onClose={() => setShowErrorAlert(false)} severity={alertType} sx={{ width: 400 }}>
                    {alertError}
                </Alert>
            </Snackbar >

            <Footer />
        </Stack >
    )
}

export default Account