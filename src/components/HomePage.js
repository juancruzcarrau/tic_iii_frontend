import React, {useState} from 'react';
import {Box, Drawer, Pagination, Paper, styled} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TableCard from "./TableCard";
import HomePagination from "./HomePagination";
import UserService from "../services/UserService";
import {useParams} from "react-router-dom";


const HomePage = ({tableCreated}) => {

    const style = {
        container: {
            maxWidth: "90%",
            height: "50vh"
        },
        element: {
            minWidth: "20vw",
            minHeight: "25vh"
        }
    }

    const [tables, setTables] = useState([]);

    const user = UserService.getCurrentUser()

    const { type } = useParams();

    const [tableChange, setTableChange] = useState(false);

    function updateTable(){
        setTableChange(!tableChange);
    }

    return (
        <div>
            <h2>Welcome {user.nombre}!</h2>
            <h3>Tables:</h3>
            <Box sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "40px",
                    height: "60vh"
                        }}>
                <Grid2 sx={style.container} container spacing={2}>
                    {tables.map((element) => {
                        return <Grid2 xs={4} md={3} key={element.id} sx={style.element}> <TableCard tablero={element} tableChange={() => updateTable()}/> </Grid2>
                    })}
                </Grid2>
            </Box>
            <Box>
                <HomePagination setTables={(t) => setTables(t)} tableCreated={tableCreated} tableChange={tableChange} type={type}/>
            </Box>
        </div>
    );
};

export default HomePage;