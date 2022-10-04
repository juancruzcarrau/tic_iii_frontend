import React, {useEffect, useRef, useState} from 'react';
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
import UserService from "../services/UserService";
import {useForm} from "react-hook-form";
import {Dialog, DialogActions, DialogContent, DialogTitle, Input, Slide, TextField} from "@mui/material";
import BoardService from "../services/BoardService";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NavBar = ({dialogFunction, tableCreated, setFavorites, closeFavorites}) => {

    const styles = {
        buttonArea: {
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "15px",
            color: "inherit"
        },
        buttonCreate:{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            marginTop: "10px"
        }
    }

    const [openDialog, setOpenDialog] = React.useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const navigate = useNavigate();

    function logout() {
        UserService.logOut();
        navigate('/login')
    }

    function handleClickCreateOpen() {
        setOpenDialog(true);
    }

    const handleCreateDialogClose = () => {
        setOpenDialog(false);
        reset();
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null)
    }

    const [anchorElUser, setAnchorElUser] = useState(null);

    const [file, setFile] = useState(null);

    const user = UserService.getCurrentUser();

    const handleCreate = (data) => {
        setOpenDialog(false);
        const formData = new FormData()
        formData.append('mailUsuario', user.email);
        formData.append('nombre', data.nombre);
        formData.append('imagen', file);

        BoardService.create(formData).then(tableCreated);
        setFile(null);
        reset();
    }


    const changeFile = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="100vh">
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
                        <Button sx={styles.buttonArea} variant="text" onClick={closeFavorites}>
                            Workspaces
                        </Button>
                        <Button sx={styles.buttonArea} variant="text" onClick={setFavorites}>
                            Favorites
                        </Button>
                        <Button sx={styles.buttonArea} variant="text">
                            Recent
                        </Button>
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickCreateOpen}>
                            Create
                        </Button>
                    </Box>

                    <Dialog open={openDialog} onClose={handleCreateDialogClose} TransitionComponent={Transition}>
                        <DialogTitle>Create Table</DialogTitle>
                        <DialogContent>
                            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    {...register(
                                        "nombre",
                                        {required: 'Name required'})}
                                    error={Boolean(errors.nombre)}
                                    helperText={errors.nombre?.message}
                                    margin="dense"
                                    id="nombre"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                />
                                <Input
                                    onChange={(e) => changeFile(e)}
                                    type="file"
                                    fullWidth
                                    />
                                <DialogActions sx={styles.buttonCreate}>
                                    <Button variant="outlined" onClick={handleCreateDialogClose}>Cancel</Button>
                                    <Button variant="contained" type="submit">Create</Button>
                                </DialogActions>
                            </form>
                        </DialogContent>

                    </Dialog>


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
                            <MenuItem onClick={logout}>
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