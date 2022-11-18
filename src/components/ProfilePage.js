import React, {useEffect, useRef, useState} from "react";
import {
    Alert,
    Button, CardMedia,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle,
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
import Box from "@mui/material/Box";
import avatar from "../misc/default-avatar.jpg";

const ProfilePage = () => {

    const {register: registerEdit, handleSubmit: handleSubmitEdit, formState: {errors: errorsEdit}, reset: resetEdit} = useForm();
    const {register: registerFile, handleSubmit: handleSubmitFile, formState: {errors: errorsFile}, reset: resetFile} = useForm();

    const [errMsg, setErrMsg] = useState('');
    const [successfulMsg, setSuccessMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openFileDialog, setOpenFileDialog] = useState(false);
    const [file, setFile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const ref = useRef(null);

    const [user, setUser] = useState(UserService.getCurrentUser);
    const [rows, setRows] = useState([{property: 'Name:', data: user.nombre}, {property: 'Email:', data: user.email}]);

    const [styles, setStyles] = useState({
        mainFlex: {
            display: "flex",
            width: "calc(100% - 2*15)",
            maxHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            minHeight: "calc(100% - 15px - 10px)",
            padding: "15px",
            paddingTop: "10px",
            flexDirection: "column",
            gap: "10px"
        },
        alert: {
            marginBottom: "10px"
        },
        buttonArea: {
            marginBottom: "10px",
            textAlign: "center",
            width: "200px"
        },
        buttonDialog: {
            display: "flex",
            marginBottom: "10px",
            marginTop: "20px",
            textAlign: "center",
            justifyContent: "space-between",
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
            paddingTop: "10%",
            flexGrow: "1",
            paddingLeft:"15%"
        },
        flexRightItem: {
            flexGrow: "2"
        }
    })

    useEffect(() => {

        let path = window.location.pathname
        const splittedPath = path.split("/")

        if (splittedPath[2] != user.id) {
            navigate('/pagenotfound/404')
        }

        if (user.imagenUsuarioDto != null) {
            setProfilePicture(user.imagenUsuarioDto.foto)
        }
        else {
            setProfilePicture(avatar)
        }
    }, [])

    const mainFlexHeightAdjustment = () => {
        let copy = styles;
        const offsetTop = ref.current.offsetTop;
        const newHeight = "calc(100% - 15px - 10px - " + offsetTop + "px)"
        copy.mainFlex = {...copy.mainFlex, minHeight: newHeight, maxHeight: newHeight}
        setStyles(copy)
    }

    function logout() {
        UserService.logOut();
        navigate('/login')
    }

    useEffect(() => {
        setRows([{property: 'Name:', data: user.nombre}, {property: 'Email:', data: user.email}]);
    }, [user])

    useEffect(() => {
        mainFlexHeightAdjustment();
    }, [])

    const handleEditDialogOpen = () => {
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
        setErrMsg('');
        resetEdit();
    };

    const handleFileDialogOpen = () => {
        setOpenFileDialog(true);
    };

    const handleFileDialogClose = () => {
        setOpenFileDialog(false);
        setErrMsg('');
        resetEdit();
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
                resetEdit();

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

    function refreshPage() {
        window.location.reload(false);
    }

    const handleFile = (data) => {
        const formData = new FormData()
        formData.append('email', user.email);
        formData.append('imagen', file);

        UserService.editProfilePicture(formData).then(newUser => {
            setUser(newUser);
            setOpenFileDialog(false);
            setFile(null);
            resetFile();
            refreshPage()
        }).catch(error => {
            if (error.request.status === 500){
                setErrMsg('It occured an error trying to upload the file');
            }
        });
    }

    return (
        <Box sx={styles.mainFlex} ref={ref}>
            <Box sx={styles.flexContainer}>

                <Box sx={styles.flexLeftItem}>
                    <IconButton onClick={handleFileDialogOpen}>
                        {profilePicture?<CardMedia
                            sx={{display: 'inline-block', position: 'relative', width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%'}}
                            component="img"
                            image={user.imagenUsuarioDto != null ? `data:image/jpeg;base64,${profilePicture}`: profilePicture}
                            alt="image"
                        />:<></>}
                    </IconButton>
                    <Box mt={4} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                        <Table sx={{width:"250px"}} aria-label="data table">
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

                    <form noValidate autoComplete="off" onSubmit={handleSubmitEdit(handleEdit)}>
                        <TextField
                            {...registerEdit(
                                "name",
                                {required: 'Name required'})}
                            error={Boolean(errorsEdit.name)}
                            helperText={errorsEdit.name?.message}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            {...registerEdit(
                                "password1",
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
                            error={Boolean(errorsEdit.password1)}
                            helperText={errorsEdit.password1?.message}
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
                            {...registerEdit(
                                "password2",
                                {required: 'Password required', pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, message: "Invalid password. It must contain at least eight characters, one letter and one number"}})}
                            error={Boolean(errorsEdit.password2)}
                            helperText={errorsEdit.password2?.message}
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

                <Collapse in={errMsg.length !== 0} sx={styles.alert}>
                    <Alert severity='error'>{errMsg}</Alert>
                </Collapse>

                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmitFile(handleFile)}>
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