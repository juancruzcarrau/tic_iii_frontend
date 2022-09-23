import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./NavBar";
import {useSelector} from "react-redux";
import TableService from "../services/TableService";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MainPage = () => {

    const user = useSelector(state => state.activeUser.value[0]);
    const createTableRef = useRef();

    function handleClickCreateOpen() {
        setOpenDialog(true);
    }

    const handleCreateDialogClose = () => {
        setOpenDialog(false);
        reset();
    };

    const [openDialog, setOpenDialog] = React.useState(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const [tableros, setTableros] = useState([]);

    useEffect(() => {
        TableService.getAll(user.email)
            .then(res => {
                setTableros(res)
                console.log(tableros)
            })
    }, [])

    const handleCreate = (data) => {
        setOpenDialog(false);

        data["mailUsuario"] = user.email;
        TableService.create(data).then(r => {
            setTableros([...tableros, r])
        });

        reset();
        console.log(tableros)
        // aca ponsemos el servicio para pegarle al back
    }

    return (
        <div>
            <NavBar dialogFunction={() => handleClickCreateOpen()}/>
            <Dialog open={openDialog} onClose={handleCreateDialogClose} TransitionComponent={Transition}>
                <DialogTitle>Create Table</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleCreate)}>
                        <TextField
                            autoFocus
                            {...register(
                                "nombre",
                                {required: 'Name required'})}
                            error={Boolean(errors.nombre)}
                            helperText={errors.nombre?.message}
                            margin="dense"
                            id="nombre"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogActions>
                            <Button onClick={handleCreateDialogClose}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
            <br/>
            <h1>Welcome {user.nombre}!</h1>
            <h3>Workspaces:</h3>
            <div>

            </div>
        </div>
    );
};

export default MainPage;