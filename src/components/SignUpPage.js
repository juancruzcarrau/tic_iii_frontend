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
import {
    Alert,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Slide,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import TableService from "../services/TableService";
import UserService from "../services/AuthentictionService";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const SignUpPage = ({ isDialogOpened, handleCloseDialog }) => {

    const styles = {
        buttonArea: {
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "15px",
            color: "inherit"
        }
    }

    //const navigate = useNavigate();
    //const user = UserService.getCurrentUser();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const handleClose = () => {
        handleCloseDialog(false);
        reset();
    };

    const handleCreate = (data) => {
        handleCloseDialog(false);
        console.log("ok");
        //data["mailUsuario"] = user.email;
        //data["nombreUsuario"] = user.nombre;
        //TableService.create(data).then(r => {
        //    dialogFunction(!tableCreated);
        //});
        //reset();
    }

    // const handleCreate = (data) => {
    //
    //     setErrMsg("");
    //
    //     UserService.authenticate(data)
    //         .then(res => {
    //             navigate('/home')})
    //         .catch(error => {
    //             if (error.request.status === 401) {
    //                 setErrMsg("Email o contraseña incorrecta.")
    //             } else {
    //                 setErrMsg("Ha ocurrido un error inesperado.")
    //                 console.log(error)
    //             }
    //         });
    // }

    return (
        <div>

            <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                <Alert severity='error'>{errMsg}</Alert>
            </Collapse>

            <Dialog open={isDialogOpened} onClose={handleClose}>
                <DialogTitle>Sign up</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
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
                            autoFocus
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
                                {required: 'Password required'})}
                            error={Boolean(errors.password1)}
                            helperText={errors.password1?.message}
                            autoFocus
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
                                {required: 'Password required'})}
                            error={Boolean(errors.password2)}
                            helperText={errors.password2?.message}
                            autoFocus
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
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            <Button variant="contained"  type="submit">Register</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

        </div>

    );
};

export default SignUpPage;