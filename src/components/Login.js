import { useRef, useState, useEffect} from "react";
import {Alert, Button, Collapse, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import logo from "../misc/logo-sin-fondo.png";
import AuthenticationService from "../services/AuthentictionService";

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

    //FormHook
    const {register, handleSubmit, formState: {errors}} = useForm();

    const emailRef = useRef()
    const errRef = useRef()

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [])

    const test = (data) => {
        console.log(data)
        AuthenticationService.authenticate({})
    }

    return (
        <div>

            <img src={logo} alt="logo" style={{width: "150px"}}/>

            <h1 style={{fontFamily: "Montserrat"}}>Welcome to Thorus</h1>

            <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                <Alert severity='error' ref={errRef}>{errMsg}</Alert>
            </Collapse>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(test)}>
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
                        "password",
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