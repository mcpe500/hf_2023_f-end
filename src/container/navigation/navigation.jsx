import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RobotoCondensed from '../../assets/font/RobotoCondensed/RobotoCondensed-Regular.ttf';

function Navigation(props) {
    const navAuthenticated = ["Logout"]
    const navItems = ["Home", "Login / Register"]
    const url = ["/", "/login"]
    const authenticated = localStorage.getItem("jwt_token").length !== 0
    return (
    <>
        <CssBaseline />
        <AppBar component="nav" sx={{
            position: "fixed",
        }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {}}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                <MenuIcon />
                </IconButton>
                <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
                >
                NAMA APLIKASI
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {authenticated ? (
                    navAuthenticated.map((item, i) => (
                            <Link to={url[i]} style={{textDecoration: 'none'}}>
                                <Button key={item} sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            </Link>
                        ))
                    ) : (
                        navItems.map((item, i) => (
                            <Link to={url[i]} style={{textDecoration: 'none'}}>
                                <Button key={item} sx={{ color: '#fff' }}>
                                    {item}
                                </Button>
                            </Link>
                        ))
                    )
                }
                </Box>
            </Toolbar>
        </AppBar>
    </>
    );
}

export default Navigation;