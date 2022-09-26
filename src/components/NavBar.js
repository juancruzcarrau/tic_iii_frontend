import React, {useEffect, useRef} from 'react';
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
import logo from "../misc/logo-blanco-sin-fondo.png";
import '../App.css';
import {useNavigate} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import TableService from "../services/TableService";
import UserService from "../services/AuthentictionService";

const NavBar = ({dialogFunction}) => {

    const styles = {
        buttonArea: {
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "15px",
            color: "inherit"
        }
    }


    const navigate = useNavigate();

    function handleCloseUserMenu() {
        UserService.logOut();
        navigate('/')
    }


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const user = UserService.getCurrentUser();


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="logo" style={{width: "50px"}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: '10px'
                        }}
                    >
                        Thorus
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/*<Menu*/}
                        {/*    id="menu-appbar"*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'bottom',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    keepMounted*/}
                        {/*    transformOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    sx={{*/}
                        {/*        display: { xs: 'block', md: 'none' },*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <MenuItem onClick={handleCloseUserMenu}>*/}
                        {/*        <Typography textAlign="center">Logout</Typography>*/}
                        {/*    </MenuItem>*/}
                        {/*</Menu>*/}
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Thorus
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={styles.buttonArea} variant="text">
                            Workspaces
                        </Button>
                        <Button sx={styles.buttonArea} variant="text">
                            Favorites
                        </Button>
                        <Button sx={styles.buttonArea} variant="text">
                            Recent
                        </Button>
                        <Button sx={styles.buttonArea} variant="text" onClick={dialogFunction}>
                            Create
                        </Button>
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            
        </AppBar>
    );
};

export default NavBar;