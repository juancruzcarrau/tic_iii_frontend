import React, {useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import Board from "./Board";
import Box from "@mui/material/Box";

const MainPage = () => {

    const styles = {
        mainPage: {
            minHeight: "100%",
            height: "100%",
            backgroundColor: "#ebedf2"
        }
    }

    const [tableCreated, setTableCreated] = useState(false);


    function tableCreatedFunc(){
        setTableCreated(!tableCreated)
    }


    return (
        <Box sx={styles.mainPage}>
            <NavBar tableCreated={() => tableCreatedFunc()}/>
            <Routes>
                <Route path='/' element={ <Navigate to="/home" /> }/>
                <Route path="/:type" element={<HomePage tableCreated={tableCreated} />}/>
                <Route path="/board/:id" element={<Board/>}/>
            </Routes>
        </Box>
    );
};

export default MainPage;