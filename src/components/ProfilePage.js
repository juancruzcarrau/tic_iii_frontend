import React, {useRef, useState, useEffect} from "react";
import {
    Alert,
    Button,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    InputAdornment, Paper,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import logo from "../misc/logo-sin-fondo.png";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import SignUpPage from "./SignUpPage";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import logee from "../misc/logo-blanco-sin-fondo.png";
import BoardService from "../services/BoardService";

const ProfilePage = () => {

    const styles = {
        field: {
            color: "white",
            marginBottom: "10px",
            width: "100%"
        },
        alert: {
            marginBottom: "10px",
        },
        buttonArea: {
            display: "flex",
            marginBottom: "10px",
            textAlign: "center"
        },
        avatarButton: {
            width: "230px",
            height: "230px",
            marginBottom: "10px",
            textAlign: "center"
        },
        centerAvatar: {
            width: "230px",
            height: "230px",
            margin: "0 auto"
        },
        gridStyle: {
            width: "100vw",
            height: "100vh",
            margin: "0 auto",
            paddingTop: "5%"
        },
        fileUpload: {
            marginTop: "20px"
        }
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const [errMsg, setErrMsg] = useState(false);
    const [successfulMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openFileDialog, setOpenFileDialog] = useState(false);
    const [file, setFile] = useState(null);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const user = UserService.getCurrentUser()

    const handleEditDialogOpen = () => {
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setErrMsg(false);
        reset();
    };

    const handleFileDialogOpen = () => {
        setOpenFileDialog(true);
    };

    const handleFileDialogClose = () => {
        setOpenFileDialog(false);
        setErrMsg(false);
        reset();
    };

    const changeFile = (event) => {
        setFile(event.target.files[0]);
    }

    const handleEdit = (data) => {

    }

    const handleFile = (data) => {

    }

    const navigate = useNavigate();

    function createData(title, data) {
        return { title, data };
    }

    const rows = [
        createData('Name:', user.nombre),
        createData('Email:', user.email)
    ];

    function logout() {
        UserService.logOut();
        navigate('/login')
    }

    return (
        <div>

            <Grid container spacing={4} sx={styles.gridStyle} >

                <Grid item>
                    <IconButton onClick={handleFileDialogOpen} sx={styles.avatarButton}>
                        <Avatar alt="Remy Sharp" sx={styles.centerAvatar} />
                    </IconButton>
                    <Box mt={4}>
                        <Button onClick={handleEditDialogOpen} sx={styles.buttonArea} variant="contained" fullWidth>
                            Edit profile
                        </Button>
                        <Button onClick={logout} sx={styles.buttonArea} variant="outlined" fullWidth>
                            Logout
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={6} textAlign="left" marginTop="65px" marginLeft="15px">
                    <TableContainer>
                        <Table sx={{ minWidth: 400, borderBottom: "none"}} aria-label="data table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.title} sx={ { '&:last-child td, &:last-child th': { border: 0 , borderBottom: "none"} }}>
                                        <TableCell align="right">{row.title}</TableCell>
                                        <TableCell align="left">{row.data}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={openEditDialog} onClose={handleEditDialogClose} >
                <DialogTitle>Edit your changes</DialogTitle>
                <DialogContent>

                    <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                        <Alert severity='error'>{errMsg}</Alert>
                    </Collapse>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleEdit)}>
                        <TextField
                            {...register(
                                "name",
                                {required: 'Name required'})}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            {...register(
                                "email",
                                {required: 'Email required', pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email"}})}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            {...register(
                                "password1",
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
                            error={Boolean(errors.password1)}
                            helperText={errors.password1?.message}
                            margin="dense"
                            id="password1"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            {...register(
                                "password2",
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
                            error={Boolean(errors.password2)}
                            helperText={errors.password2?.message}
                            margin="dense"
                            id="password2"
                            label="Repeat Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <DialogActions>
                            <Button variant="outlined" onClick={handleEditDialogClose}>Cancel</Button>
                            <Button variant="contained"  type="submit">Confirm changes</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openFileDialog} onClose={handleFileDialogClose}>
                <DialogTitle>Select a profile picture</DialogTitle>
                <Collapse in={errMsg}>
                    <Alert severity='error'>There was an unexpected error</Alert>
                </Collapse>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleFile)}>
                        <input
                            className={styles.fileUpload}
                            onChange={(e) => changeFile(e)}
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple={false}
                        />
                        <Box sx={styles.buttonCreate}>
                            <Button variant="outlined" onClick={handleFileDialogClose}>Cancel</Button>
                            <Button variant="contained" type="submit">Change picture</Button>
                        </Box>
                    </form>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default ProfilePage