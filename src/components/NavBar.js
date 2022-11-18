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
import AddIcon from '@mui/icons-material/Add';

import {
    Alert, CircularProgress,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Fab, Fade,
    Input,
    Slide,
    TextField
} from "@mui/material";
import BoardService from "../services/BoardService";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecentTableCard from "./RecentTableCard";
import ImageService from "../services/ImageService";
import DefautImage from "./DefautImage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NavBar = ({tableCreated}) => {

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
            marginTop: "15px",
        },
        fileUpload: {
            marginTop: "20px"
        },
        searchField: {
            color: "#BABFCB"
        },
        recent:{
            width:"500px",
            display:"flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:"center"
        }
    }

    const [openDialog, setOpenDialog] = React.useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState(false);

    const [faltaImagen, setFaltaImagen] = useState(false);

    const [defaultImages, setDefaultImages] = useState();

    const [defaultImageSelected, setDefaultImageSelected] = useState(9999)

    function setImage(image) {
        setDefaultImageSelected(image);
    }

    useEffect(() => {
        ImageService.get().then(res => {
            setDefaultImages(res)})
    },[])

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
        setDefaultImageSelected(9999);
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

    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const open2 = Boolean(anchorEl3);
    const handleClickRecentReduce = (event) => {
        BoardService.getRecent(user.email).then(res => {
            setRecentTables(res);
        })
        setAnchorEl3(event.currentTarget);

    };
    const handleCloseRecentreduce = () => {
        setAnchorEl3(null);
    };

    const handleCreate = (data) => {
        if (defaultImageSelected === 9999) {
            setFaltaImagen(true)
        }else {
            const formData = new FormData()
            formData.append('mailUsuario', user.email);
            formData.append('nombre', data.nombre);
            formData.append('id_imagen', defaultImageSelected);
            formData.append('imagen', file);

            BoardService.create(formData).then(() => {
                tableCreated()
                setOpenDialog(false);
                setFile(null);
                setDefaultImageSelected(9999)
                setFaltaImagen(false)
                reset();
            }).catch(error => {
                if (error.request.status === 500){
                    setErrMsg(true);
                }
            });
        }

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

    function hanldeArchivedTables() {
        navigate("archived")
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="100vh">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to={"/home"}>
                            <img src={logo} alt="logo" style={{width: "50px"}}/>
                        </Link>
                    </Box>
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


                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow:1 }}>
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
                            <MenuItem onClick={handleClickRecentReduce}>
                                <Typography textAlign="center">Recent</Typography>
                            </MenuItem>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button'
                                }}
                                anchorEl={anchorEl3}
                                open={open2}
                                onClose={handleCloseRecentreduce}
                                TransitionComponent={Fade}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <Box style={styles.recent}>
                                    {recentTables ? recentTables.map((element) => {
                                        return <RecentTableCard key={element.id} table={element} click={handleCloseRecentreduce}/>
                                    }): <></>}
                                </Box>
                            </Menu>
                            <MenuItem onClick={handleCreateMenu}>
                                Create
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none'}, mr: 2, flexGrow: 1 }}>
                        <Link to={"/home"}>
                            <img src={logo} alt="logo" style={{width: "50px"}}/>
                        </Link>
                    </Box>

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
                            <Box style={{ width: "270px",display:"flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
                                {recentTables ? recentTables.map((element) => {
                                    return <RecentTableCard key={element.id} table={element} click={handleCloseRecent}/>
                                }): <CircularProgress />}
                            </Box>
                        </Menu>
                        <Button sx={styles.buttonArea} variant="text" onClick={handleClickCreateOpen}>
                            Create
                        </Button>
                    </Box>

                    <Dialog open={openDialog} onClose={handleCreateDialogClose} TransitionComponent={Transition}>
                        <DialogTitle sx={{padding: "16px 24px 0px 24px"}}>Create Table</DialogTitle>
                        <Collapse in={errMsg}>
                            <Alert severity='error'>There was an unexpected error</Alert>
                        </Collapse>
                        <Collapse in={faltaImagen}>
                            <Alert severity='error'>Select an image or upload one</Alert>
                        </Collapse>
                        <DialogContent sx={{padding: "5px 24px 20px 24px"}}>
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
                                <Box sx={{ display: "flex", marginTop:"10px"}} >
                                    {defaultImages && defaultImages.map((element) => {
                                        return <DefautImage key={element.id} image={element} imageSelected={defaultImageSelected === element.id} functionSelection={(id) => setImage(id)} />
                                    })}
                                    <Box sx={{height: "80px", width:"130px", display: "flex",alignItems:"center", cursor:"pointer", justifyContent: "center", borderRadius: "10px",
                                        '&:hover': {
                                            backgroundColor: '#d8d8d8',
                                            opacity: [0.7],
                                        }}}>
                                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{height:"100%", width:"100%", borderRadius: "0px"}}>
                                            <input hidden accept="image/*" type="file" onChange={(e) => changeFile(e)} />
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
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
                            <MenuItem onClick={hanldeArchivedTables}>
                                <Typography textAlign="center">Archived</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            
        </AppBar>
    );
};

export default NavBar;