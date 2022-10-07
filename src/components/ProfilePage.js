import React, {useRef, useState, useEffect} from "react";
import {Alert, Button, Collapse, InputAdornment, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import logo from "../misc/logo-sin-fondo.png";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import SignUpPage from "./SignUpPage";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

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
            justifyContent: "space-between",
            marginBottom: "10px"
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
            <h1>{user.nombre}, {user.email}</h1>



        </div>
    )
}

export default ProfilePage