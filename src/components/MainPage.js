import React, {useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import Board from "./Board";
import Box from "@mui/material/Box";
import ProfilePage from "./ProfilePage";

const MainPage = () => {

    const styles = {
        mainPage: {
            minHeight: "100%",
            height: "100%",
            backgroundColor: "#ebedf2"
        }
    }

    const [tableCreated, setTableCreated] = useState(false);

    const [show, setShow] = useState("all")

    function tableCreatedFunc(){
        setTableCreated(!tableCreated)
    }

    function showFavorites(){
     setShow("favorites");
    }

    function closeFavorites(){
        setShow("all")
    }

    return (
        <Box sx={styles.mainPage}>
            <NavBar tableCreated={() => tableCreatedFunc()} setFavorites={() => showFavorites()} closeFavorites={() => closeFavorites()}/>
            <Routes>
                <Route path='/' element={ <Navigate to="/home" /> }/>
                <Route path="/home" element={<HomePage tableCreated={tableCreated} show={show}/>}/>
                <Route path="/board/:id" element={<Board/>}/>
                <Route path="/profile/:id" element={<ProfilePage/>}/>
            </Routes>
        </Box>
    );
};

export default MainPage;