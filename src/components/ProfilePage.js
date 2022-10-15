import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Collapse, Dialog, DialogContent, DialogTitle,
    InputAdornment,
    Table, TableBody,
    TableCell, TableContainer,
    TableRow,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const ProfilePage = () => {

    const styles = {
        alert: {
            marginBottom: "10px",
        },
        buttonArea: {
            display: "flex",
            marginBottom: "10px",
            textAlign: "center"
        },
        buttonDialog: {
            display: "flex",
            marginBottom: "10px",
            marginTop: "20px",
            textAlign: "center",
            marginLeft: "20px"
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
        fileUpload: {
            marginLeft: "100px",
            marginTop: "40px"
        },
        fileUploadCancel: {
            marginTop: "40px"
        },
        flexContainer: {
            display: "flex",
            padding: "0 200px 0",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            height: "100%",
            gap: "40px"
        },
        flexLeftItem: {
            flexGrow: "1"
        },
        flexRightItem: {
            flexGrow: "2"
        }

    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const [errMsg, setErrMsg] = useState('');
    const [successfulMsg, setSuccessMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openFileDialog, setOpenFileDialog] = useState(false);
    const [file, setFile] = useState(null);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const [user, setUser] = useState(UserService.getCurrentUser);
    const [rows, setRows] = useState([{property: 'Name:', data: user.nombre}, {property: 'Email:', data: user.email}]);

    function logout() {
        UserService.logOut();
        navigate('/login')
    }

    useEffect(() => {
        setRows([{property: 'Name:', data: user.nombre}, {property: 'Email:', data: user.email}]);
    }, [user])

    const handleEditDialogOpen = () => {
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setErrMsg('');
        reset();
    };

    const handleFileDialogOpen = () => {
        setOpenFileDialog(true);
    };

    const handleFileDialogClose = () => {
        setOpenFileDialog(false);
        setErrMsg('');
        reset();
    };

    const changeFile = (event) => {
        setFile(event.target.files[0]);
    }

    const handleEdit = (data) => {
        if ((data.password1 === data.password2) && (data.password1 !== user.contrasena)) {

            const updatedUser = {nombre: data.name, email: user.email, contrasena: data.password1};

            UserService.editProfile(updatedUser).then(newUser => {
                setUser(newUser);
                handleEditDialogClose();
                setSuccessMsg("Your data was successfully updated")
                reset();

            }).catch(error => {
                    setErrMsg("An unexpected error has occurred.")
                    console.log(error)
            });

        } else if ((data.password1 === data.password2) && (data.password1 === user.contrasena)) {
            setErrMsg("Your new password must be different from your current one")

        } else {
            setErrMsg("Passwords do not match")
        }

    }

    const handleFile = (data) => {
        const formData = new FormData()
        formData.append('mailUsuario', user.email);
        formData.append('imagen', file);

        UserService.editProfilePicture(formData).then(() => {
            setOpenFileDialog(false);
            setFile(null);
            reset();
        }).catch(error => {
            if (error.request.status === 500){
                setErrMsg('It occured an error trying to upload the file');
            }
        });
    }

    return (
        <Box sx={{height:"100%"}}>
            <Box sx={styles.flexContainer}>

                <Box sx={styles.flexLeftItem}>
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
                </Box>

                <Box sx={styles.flexRightItem}>
                    <TableContainer>
                        <Table sx={{ minWidth: 400, borderBottom: "none"}} aria-label="data table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.property} sx={ { '&:last-child td, &:last-child th': { border: 0 , borderBottom: "none"} }}>
                                        <TableCell align="right">{row.property}</TableCell>
                                        <TableCell align="left">{row.data}</TableCell>
                                    </TableRow>
                                ))}
                             </TableBody>
                        </Table>
                    </TableContainer>

                    <Collapse in={successfulMsg.length !== 0} sx={styles.alert}>
                        <Alert severity='success'>{successfulMsg}</Alert>
                    </Collapse>

                </Box>
            </Box>

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
                        <Box sx={{display:"flex",justifyContent:"flex-end"}}>
                            <Button sx={styles.buttonDialog} variant="outlined" onClick={handleEditDialogClose}>Cancel</Button>
                            <Button sx={styles.buttonDialog} variant="contained"  type="submit">Confirm changes</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openFileDialog} onClose={handleFileDialogClose}>
                <DialogTitle>Select a profile picture</DialogTitle>

                <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                    <Alert severity='error'>{errMsg}</Alert>
                </Collapse>

                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleFile)}>
                        <input
                            onChange={(e) => changeFile(e)}
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple={false}
                        />
                        <Box sx={styles.buttonCreate}>
                            <Button sx={styles.fileUploadCancel} variant="outlined" onClick={handleFileDialogClose}>Cancel</Button>
                            <Button sx={styles.fileUpload} variant="contained" type="submit">Upload</Button>
                        </Box>
                    </form>
                </DialogContent>

            </Dialog>
        </Box>
    )
}

export default ProfilePage