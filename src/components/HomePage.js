import React, {useState} from 'react';
import {Box} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TableCard from "./TableCard";
import HomePagination from "./HomePagination";
import UserService from "../services/UserService";


const HomePage = ({tableCreated}) => {

    const style = {
        container: {
            maxWidth: "90%"
        },
        element: {
            minWidth: "30vw"
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
                    marginBottom: "75px"
                        }}>
                <Grid2 sx={style.container} container spacing={3} >
                    {tables.map((element) => {
                        return <Grid2 xs={4} key={element.id} sx={style.element}> <TableCard tablero={element} tableChange={setTableChange}/> </Grid2>
                    })}
                </Grid2>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "20px"
            }}>
                <HomePagination setTables={(t) => setTables(t)} tableCreated={tableCreated} tableChange={tableChange}/>
            </Box>
        </div>
    );
};

export default HomePage;