import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material'
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userRedux';
import { Delete } from '@mui/icons-material';

const pages = ["My Reservations", "Confirm Booking"];
const pageLinks = ["/myReservations", "/confirmBooking"];

const PageHeader = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.user);

    React.useEffect(() => {
        if (currentUser) setIsLoggedIn(true);

    }, [currentUser])


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsLoggedIn(false);
        navigate("/")
    }

    return (
        <AppBar position="static" elevation={1}
            sx={{
                bgcolor: 'white'
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Logo size="sm" />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                isLoggedIn &&
                                pages.map((page, index) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={pageLinks[index]} style={{ textDecoration: "none" }}>
                                            <Button>{page}</Button>
                                        </Link>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Logo size="sm" />
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {
                            isLoggedIn &&

                            pages.map((page, index) => (

                                <Link to={pageLinks[index]} key={page} style={{ textDecoration: "none" }}>
                                    <Button
                                        variant='outlined'
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, mr: 2 }}
                                    >
                                        {page}
                                    </Button>
                                </Link>

                            ))
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {!isLoggedIn &&
                            <Link to="/login" state={{ from: location.pathname }} style={{ textDecoration: "none" }}>
                                <Button variant="outlined" size="large">
                                    Sign In
                                </Button>
                            </Link>
                        }
                        {isLoggedIn &&
                            <Box>
                                <Tooltip title="Account">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/mock-images/avatars/avatar_default.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box sx={{ my: 1.5, px: 2.5, minWidth: 200 }}>
                                        <Typography variant="subtitle1" noWrap>
                                            {currentUser.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                            {currentUser.email}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ borderStyle: 'dashed' }} />

                                    <MenuItem key="account" variant="subtitle2" onClick={handleCloseUserMenu} sx={{ m: 1 }}>
                                        <Link to="/account" style={{ textDecoration: "none", color: "black" }}>
                                            <Typography>Account</Typography>
                                        </Link>
                                    </MenuItem>

                                    <MenuItem key="logout" variant="subtitle2" onClick={handleCloseUserMenu} sx={{ m: 1 }}>
                                        <Typography onClick={handleLogout}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default PageHeader