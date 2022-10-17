import React, {useState} from 'react';
import {Box, Drawer, Pagination, Paper, styled, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TableCard from "./TableCard";
import HomePagination from "./HomePagination";
import UserService from "../services/UserService";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";


const HomePage = ({tableCreated}) => {

    const style = {
        container: {
            maxWidth: "90%",
            marginBottom: "10px"
        },
        element: {
            minWidth: "20vw",
            minHeight: "25vh"
        }
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm();


    const [tables, setTables] = useState([]);

    const user = UserService.getCurrentUser()

    const { type } = useParams();

    const [tableChange, setTableChange] = useState(false);

    function updateTable(){
        setTableChange(!tableChange);
    }

    function handleSearch() {

    }

    return (
        <div>
            <Typography variant="h4" sx={{marginTop:"10px"}}>Welcome {user.nombre}!</Typography>
            <Typography variant="h6" sx={{marginBottom: "20px"}}>Tables:</Typography>
            {/*<Box sx={{display:"flex",marginBottom:"10px"}}>*/}
            {/*    <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSearch)}>*/}
            {/*        <TextField*/}
            {/*            variant="outlined"*/}
            {/*            {...register(*/}
            {/*                "nombre",)}*/}
            {/*            margin="dense"*/}
            {/*            id="nombre"*/}
            {/*            label="Name"*/}
            {/*            type="text"*/}
            {/*        />*/}
            {/*    </form>*/}
            {/*</Box>*/}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Grid2 sx={style.container} container spacing={2}>
                    {tables.map((element) => {
                        return <Grid2 xs={12} sm={6} lg={4} xl={3} key={element.id} sx={style.element}> <TableCard
                            tablero={element} tableChange={() => updateTable()}/> </Grid2>
                    })}
                </Grid2>
                <HomePagination setTables={(t) => setTables(t)} tableCreated={tableCreated} tableChange={tableChange}
                                type={type}/>
            </Box>
        </div>
    );
};

export default HomePage;