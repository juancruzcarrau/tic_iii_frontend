import React, {useEffect, useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import '../App.css';
import {
    Alert,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
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
        if (data.password1 === data.password2) {
            handleCloseDialog(false);
            const newUser = {name: data.name, email: data.email, password: data.password1};
            console.log(newUser);
            reset();
        } else {
            setErrMsg("Passwords do not match")
        }
    }

    return (
        <div>

            <Dialog open={isDialogOpened} onClose={handleClose}>
                <DialogTitle>Sign up</DialogTitle>
                <DialogContent>

                    <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                        <Alert severity='error'>{errMsg}</Alert>
                    </Collapse>

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
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
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
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
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