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
import {Alert, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import TableService from "../services/TableService";
import UserService from "../services/AuthentictionService";

const SignUpPage = () => {

    const styles = {
        buttonArea: {
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "15px",
            color: "inherit"
        }
    }

    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = React.useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const user = UserService.getCurrentUser();

    const handleCreateDialogClose = () => {
        setOpenDialog(false);
        reset();
    };

    const handleCreate = (data) => {
        setOpenDialog(false);
        data["mailUsuario"] = user.email;
        data["nombreUsuario"] = user.nombre;
        TableService.create(data).then(r => {
            dialogFunction(!tableCreated);
        });
        reset();
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

            <Dialog open={openDialog} onClose={handleCreateDialogClose}>
                <DialogTitle>Sign up</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
                        <TextField
                            {...register(
                                "email",
                                {required: 'Email required', pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email"}})}
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password1"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password2"
                            label="Repeat Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                        <DialogActions>
                            <Button variant="outlined" onClick={handleCreateDialogClose}>Cancel</Button>
                            <Button variant="contained"  type="submit">Register</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

        </div>


    );
};

export default NavBar;