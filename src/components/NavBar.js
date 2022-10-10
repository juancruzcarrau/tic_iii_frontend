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
import {Link, useNavigate, useParams} from "react-router-dom";
import UserService from "../services/UserService";
import {useForm} from "react-hook-form";
import {
    Alert,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fade,
    Input,
    Slide,
    TextField
} from "@mui/material";
import BoardService from "../services/BoardService";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecentTableCard from "./RecentTableCard";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NavBar = ({dialogFunction, tableCreated}) => {

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
            marginTop: "10px",
        },
        fileUpload: {
            marginTop: "20px"
        }
    }

    const [openDialog, setOpenDialog] = React.useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState(false);

    function logout() {
        UserService.logOut();
        navigate('/login')
    }

    function handleClickCreateOpen() {
        setOpenDialog(true);
    }

    const handleCreateDialogClose = () => {
        setOpenDialog(false);
        setErrMsg(false);
        reset();
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenMenu = (event) => {
        setAnchorElUser1(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null)
    }

    const handleCloseMenu = (event) => {
        setAnchorElUser1(null)
    }

    const [anchorElUser, setAnchorElUser] = useState(null);

    const [anchorElUser1, setAnchorElUser1] = useState(null);

    const [recentTables, setRecentTables] = useState(null);


    const [file, setFile] = useState(null);

    const user = UserService.getCurrentUser();

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open = Boolean(anchorEl2);
    const handleClickRecent = (event) => {
        BoardService.getRecent(user.email).then(res => {
            setRecentTables(res);
        })
        setAnchorEl2(event.currentTarget);
    };
    const handleCloseRecent = () => {
        setAnchorEl2(null);
    };

    const handleCreate = (data) => {
        const formData = new FormData()
        formData.append('mailUsuario', user.email);
        formData.append('nombre', data.nombre);
        formData.append('imagen', file);

        BoardService.create(formData).then(() => {
            tableCreated()
            setOpenDialog(false);
            setFile(null);
            reset();
        }).catch(error => {
            if (error.request.status === 500){
                setErrMsg(true);
            }
        });
    }


    const changeFile = (event) => {
        setFile(event.target.files[0]);
    }

    function handleClickHome() {
        navigate('home');
    }

    function handleClickFavorites() {
        navigate('favorites');
    }

    function HandleHomeMenu() {
        handleClickHome();
        handleCloseMenu();
    }

    function HandleFavoriteMenu() {
        handleClickFavorites();
        handleCloseMenu();
    }

    function handleCreateMenu() {
        handleCloseMenu();
        handleClickCreateOpen();
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="100vh">
                <Toolbar disableGutters>
                    <Link to={"/home"}>
                        <img src={logo} alt="logo" style={{width: "50px"}}/>
                    </Link>
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
                            onClick={handleOpenMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            open={Boolean(anchorElUser1)}
                            anchorEl={anchorElUser1}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={HandleHomeMenu}>
                                <Typography textAlign="center">Boards</Typography>
                            </MenuItem>
                            <MenuItem onClick={HandleFavoriteMenu}>
                                <Typography textAlign="center">Favorites</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCreateMenu}>
                                Create
                            </MenuItem>

                        </Menu>
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
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickHome}>
                            Boards
                        </Button>
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickFavorites}>
                            Favorites
                        </Button>
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickRecent} endIcon={<KeyboardArrowDownIcon />}>
                            Recent
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl2}
                            open={open}
                            onClose={handleCloseRecent}
                            TransitionComponent={Fade}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box style={{ width: "13vw",display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
                                {recentTables ? recentTables.map((element) => {
                                    return <RecentTableCard key={element.id} table={element} click={handleCloseRecent}/>
                                }): <></>}
                            </Box>
                        </Menu>
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickCreateOpen}>
                            Create
                        </Button>
                    </Box>

                    <Dialog open={openDialog} onClose={handleCreateDialogClose} TransitionComponent={Transition}>
                        <DialogTitle>Create Table</DialogTitle>
                        <Collapse in={errMsg}>
                            <Alert severity='error'>There was an unexpected error</Alert>
                        </Collapse>
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
                                <input
                                    className={styles.fileUpload}
                                    onChange={(e) => changeFile(e)}
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple={false}
                                    />
                                <Box sx={styles.buttonCreate}>
                                    <Button variant="outlined" onClick={handleCreateDialogClose}>Cancel</Button>
                                    <Button variant="contained" type="submit">Create</Button>
                                </Box>
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