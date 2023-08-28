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
import AdbIcon from '@mui/icons-material/Adb';

import { useState } from 'react';
import { menuHeader, settings } from '../utils/menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserLoggedIn } from '../apis/users.api';

const Header: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const history = useNavigate();

    const loggedInfo = getUserLoggedIn();
    const username = loggedInfo?.username;
    console.log(username);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget) {
            setAnchorElNav(event.currentTarget);
        }
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget) {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        history('/login');
    };

    return (
        <AppBar position="fixed" color="inherit" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <NavLink to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </NavLink>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
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
                            {menuHeader.map((item) => (
                                <NavLink key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" color="black">
                                            {item.text}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <NavLink to="/">
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </NavLink>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {menuHeader.map((item) => (
                            <NavLink key={item.text} to={item.path} style={{ textDecoration: 'none' }}>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block' }}>
                                    {item.text}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {username ? (
                        <>
                            <Typography sx={{ marginRight: '15px', fontWeight: '100', textTransform: 'capitalize' }}>
                                Hello {username}!
                            </Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://lh3.googleusercontent.com/a/AAcHTtd-FQHXnDlrqimqhUsdZTz1GhGViWcgNSHSMRZx1Q=s96-c"
                                        />
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                                            <NavLink to={setting.path}>
                                                <Typography textAlign="center">{setting.text}</Typography>
                                            </NavLink>
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={handleLogOut}>
                                        <Typography textAlign="center">Log out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <NavLink to="/login">
                            <Button variant="outlined">Log in</Button>
                        </NavLink>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
