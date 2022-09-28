import React, {useEffect, useRef, useState} from 'react';
import NavBar from "./NavBar";
import {useSelector} from "react-redux";
import TableService from "../services/TableService";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import HomePage from "./HomePage";

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