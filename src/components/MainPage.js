import React, {useState} from 'react';
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import {Navigate, Route, Routes} from "react-router-dom";

const MainPage = () => {

    const [tableCreated, setTableCreated] = useState(false);

    return (
        <div>
            <NavBar dialogFunction={() => setTableCreated} tableCreated={tableCreated}/>
            <Routes>
                <Route path='/' element={ <Navigate to="/home" /> }/>
                <Route path="/home" element={<HomePage tableCreated={tableCreated}/>}/>
                <Route path="/board/:id"/>
            </Routes>
        </div>
    );
};

export default MainPage;