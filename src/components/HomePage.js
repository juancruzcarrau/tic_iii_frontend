import React, {useState} from 'react';
import {Box, Pagination, Paper, styled} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TableCard from "./TableCard";
import HomePagination from "./HomePagination";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomePage = ({tableCreated}) => {

    const [tables, setTables] = useState([]);

    const [tableChange, setTableChange] = useState(false);

    return (
        <div>
            <Box sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "75px"
                        }}>
                <Grid2 sx={{maxWidth: "90%"}} container rowSpacing={3} columnSpacing={{xs:1, sm: 2, md:3}} columns={3} >
                    {tables.map((element, index) => {
                        return <Grid2 xs={1}> <TableCard tablero={element} tableChange={setTableChange}/> </Grid2>
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