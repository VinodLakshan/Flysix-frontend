import styled from '@emotion/styled';
import { LockOpenOutlined, LoginSharp } from '@mui/icons-material';
import { Alert, Avatar, Card, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import AuthHeader from '../components/AuthHeader'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../utils/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    height: "60vh",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const Login = () => {

    const [user, setUser] = useState({});
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { isFetching } = useSelector(state => state.user);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async () => {

        if (user.username && user.password) {
            setShowError(false);
            const res = await login(dispatch, user);

            switch (res.status) {
                case 200:
                    navigate((location.state !== null) ? location.state.from : "/");
                    break;

                case 403:
                    setError("Username or password is incorrect!")
                    setShowError(true);
                    break;

                default:
                    setError(res.error)
                    setShowError(true);
                    break;
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
                            Hi, Welcome Back!
                        </Typography>
                        <img src="/static/illustrations/illustration_login.png" alt="login" />
                    </SectionStyle>
                </Grid>
                <Grid item xs={12} md={8}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: {
                            xs: 10, md: 0
                        }
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
                            <LockOpenOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                            />
                            {showError && (<Alert variant="outlined" severity="error">
                                {error}
                            </Alert>)}

                            <LoadingButton
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                                endIcon={<LoginSharp />}
                                loading={isFetching}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register" variant="body1" style={{ textDecoration: 'none', color: '#00AB55' }}>
                                        {"Don't have an account? Sign Up"}
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

export default Login