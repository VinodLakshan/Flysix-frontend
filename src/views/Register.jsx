import styled from '@emotion/styled';
import { Create, HowToRegOutlined } from '@mui/icons-material';
import { Alert, Avatar, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import AuthHeader from '../components/AuthHeader'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../utils/ApiCalls';
import { LoadingButton } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    height: "38rem",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));


const Register = () => {

    const [user, setUser] = useState({});
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { isFetching } = useSelector(state => state.user);

    const navigate = useNavigate();

    const handleRegister = async () => {

        if (user.name && user.password && user.email && user.address && user.mobileNo && user.password && user.conPassword) {
            setShowError(false);

            if (user.password === user.conPassword) {

                const res = await register(dispatch, user);
                console.log(user)

                switch (res.status) {
                    case 200:
                        navigate("/");
                        break;

                    default:
                        setError(res.error);
                        setShowError(true);
                        break;
                }

            } else {
                setError("Passwords mismatched!");
                setShowError(true);
            }



        } else {
            setError("Please fill the required fields.");
            setShowError(true);
        }
    }

    return (
        <Container>

            <AuthHeader />
            <Grid container spacing={4}>
                <Grid item md={4}
                    sx={{
                        display: { xs: 'none', md: 'block' },
                    }}
                >

                    <SectionStyle>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Let's get you onboard!
                        </Typography>
                        <img src="/static/illustrations/illustration_register.png" alt="login" />
                    </SectionStyle>
                </Grid>
                <Grid item xs={12} md={8}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>

                    <Stack
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: "400px",

                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <HowToRegOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                                onChange={(e) => setUser({ ...user, "mobileNo": e })}
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                    />
                                </Grid>

                            </Grid>



                            {showError && (<Alert variant="outlined" severity="error">
                                {error}
                            </Alert>)}

                            <LoadingButton
                                color="primary"
                                fullWidth
                                onClick={handleRegister}
                                endIcon={<Create />}
                                loading={isFetching}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign Up
                            </LoadingButton>
                            <Grid container>
                                <Grid item>
                                    <Link to="/login" variant="body1" style={{ textDecoration: 'none', color: '#00AB55' }}>
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>

                </Grid>
            </Grid>
        </Container >
    )
}

export default Register