import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import UserService from "../services/AuthentictionService";

const MainPage = () => {

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
        <div>
            <NavBar tableCreated={() => tableCreatedFunc()} setFavorites={() => showFavorites()} closeFavorites={() => closeFavorites()}/>
            <HomePage tableCreated={tableCreated} show={show}/>
        </div>
    );
};

export default MainPage;