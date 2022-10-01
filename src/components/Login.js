import {useRef, useState, useEffect} from "react";
import {Alert, Button, Collapse, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import logo from "../misc/logo-sin-fondo.png";
import UserService from "../services/AuthentictionService";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const styles = {
        field: {
            color: "primary",
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

    const emailRef = useRef()
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [])


    const authenticateUser = (data) => {

        setErrMsg("");

        UserService.signup(data)
            .then(res => {
                navigate('/home')})
            .catch(error => {
                if (error.request.status === 401) {
                    setErrMsg("Email o contraseña incorrecta.")
                } else {
                    setErrMsg("Ha ocurrido un error inesperado.")
                    console.log(error)
                }
            });
    }
    const navigate = useNavigate();

    return (
        <div>

            <img src={logo} alt="logo" style={{width: "150px"}}/>

            <h1 style={{fontFamily: "Montserrat"}}>Welcome to Thorus</h1>

            <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                <Alert severity='error'>{errMsg}</Alert>
            </Collapse>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(authenticateUser)}>
                <TextField
                    label="Email"
                    variant="outlined"
                    inputRef={emailRef}
                    {...register(
                        "email",
                        {required: 'Email required', pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email"}})}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    sx={styles.field}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register(
                        "contrasena",
                        {required: 'Password required'})}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    sx={styles.field}
                />

                <div style={styles.buttonArea}>
                    <Button variant="outlined" type="submit">
                        Log in
                    </Button>

                    <Button variant="contained">
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login