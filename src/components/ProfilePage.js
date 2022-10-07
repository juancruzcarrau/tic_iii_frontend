import React, {useRef, useState, useEffect} from "react";
import {Alert, Button, Collapse, Grid, InputAdornment, TextField} from "@mui/material";
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
        }
    }

    const {register, handleSubmit, formState: {errors}} = useForm();

    const [errMsg, setErrMsg] = useState('');
    const [successfulMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const user = UserService.getCurrentUser()

    useEffect(() => {
        setErrMsg('');
    }, [])

    const navigate = useNavigate();

    return (
        <div>

            <Grid container spacing={4} sx={styles.gridStyle} >

                <Grid item direction="column">
                    <IconButton sx={styles.avatarButton}>
                        <Avatar alt="Remy Sharp" sx={styles.centerAvatar} />
                    </IconButton>
                    <Box mt={4}>
                        <Button sx={styles.buttonArea} variant="contained" fullWidth>
                            Edit profile
                        </Button>
                        <Button sx={styles.buttonArea} variant="outlined" fullWidth>
                            Logout
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={6} direction="column" textAlign="left" marginTop="65px" marginLeft="15px">
                    <h3>{user.nombre}</h3>
                    <h3>{user.email}</h3>
                </Grid>
            </Grid>

        </div>
    )
}

export default ProfilePage