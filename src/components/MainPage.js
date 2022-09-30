import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import UserService from "../services/AuthentictionService";

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
            <HomePage tableCreated={tableCreated} show={show}/>
        </div>
    );
};

export default MainPage;