import React, {useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import {Navigate, Route, Routes} from "react-router-dom";

const MainPage = () => {

    const [tableCreated, setTableCreated] = useState(false);

    const [show, setShow] = useState("all")

    function showFavorites(){
     setShow("favorites");
    }

    function closeFavorites(){
        setShow("all")
    }

    return (
        <div>
            <NavBar dialogFunction={() => setTableCreated} tableCreated={tableCreated} setFavorites={() => showFavorites()} closeFavorites={() => closeFavorites()}/>
            <Routes>
                <Route path='/' element={ <Navigate to="/home" /> }/>
                <Route path="/home" element={<HomePage tableCreated={tableCreated} show={show}/>}/>
                <Route path="/board/:id"/>
            </Routes>
        </div>
    );
};

export default MainPage;