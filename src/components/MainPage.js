import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import UserService from "../services/AuthentictionService";

const MainPage = () => {

    const [tableCreated, setTableCreated] = useState(false);

    return (
        <div>
            <NavBar dialogFunction={() => setTableCreated} tableCreated={tableCreated}/>
            <HomePage tableCreated={tableCreated}/>
        </div>
    );
};

export default MainPage;