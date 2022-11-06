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
            marginBottom: "10px",
            paddingTop: "15vh"
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

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // maxHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            // minHeight: "calc(100% - 15px - 10px)",
        }}>
            <Grid2 sx={style.container} container spacing={2} rowSpacing={4}>
                {tables.length>0 ? tables.map((element) => {
                    return <Grid2 xs={12} sm={6} lg={3} key={element.id} sx={style.element}> <TableCard
                        tablero={element} tableChange={() => updateTable()}/> </Grid2>
                }): <Grid2> <h2>No tables</h2> </Grid2>}
            </Grid2>
            <HomePagination setTables={(t) => setTables(t)} tableCreated={tableCreated} tableChange={tableChange}
                            type={type}/>
        </Box>
    );
};

export default HomePage;