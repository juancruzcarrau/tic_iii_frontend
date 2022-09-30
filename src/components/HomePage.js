import React, {useState} from 'react';
import {Box, Drawer, Pagination, Paper, styled} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TableCard from "./TableCard";
import HomePagination from "./HomePagination";
import UserService from "../services/UserService";


const HomePage = ({tableCreated, show}) => {

    const style = {
        container: {
            maxWidth: "90%"
        },
        element: {
            minWidth: "20vw"
        }
    }

    const [tables, setTables] = useState([]);

    const user = UserService.getCurrentUser()

    const [tableChange, setTableChange] = useState(false);

    return (
        <div>
            <h1>Welcome {user.nombre}!</h1>
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
                        return <Grid2 xs={3} key={element.id} sx={style.element}> <TableCard tablero={element} tableChange={setTableChange}/> </Grid2>
                    })}
                </Grid2>
            </Box>
            <Box>
                <HomePagination setTables={(t) => setTables(t)} tableCreated={tableCreated} tableChange={tableChange} type={show}/>
            </Box>
        </div>
    );
};

export default HomePage;