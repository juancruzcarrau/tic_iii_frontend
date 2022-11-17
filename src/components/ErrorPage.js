import '../App.css';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import toro from "../misc/404-bull.png";
import React, {useEffect, useRef, useState} from "react";

const ErrorPage = () => {

    const ref = useRef(null);

    const [styles, setStyles] = useState({
        mainFlex: {
            display: "flex",
            width: "calc(100% - 2*15)",
            maxHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            minHeight: "calc(100% - 15px - 10px)",
            padding: "15px",
            paddingTop: "10px",
            flexDirection: "column",
            gap: "10px"
        },
        mainBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
            height: "100%",
            color: "inherit",
            flexDirection: "row",
            paddingTop: "100px"
        },
        leftFlex: {
            display: "flex",
            justifyContent: "space-between",
            color: "inherit",
            flexDirection: "column",
            flexGrow: "1",
            textAlign: "right",
            paddingRight: "30px"
        },
        rightFlex: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "inherit",
            flexGrow: "1",
            paddingLeft: "30px"
        }
    });

    const mainFlexHeightAdjustment = () => {
        let copy = styles;
        const offsetTop = ref.current.offsetTop;
        const newHeight = "calc(100% - 15px - 10px - " + offsetTop + "px)"
        copy.mainFlex = {...copy.mainFlex, minHeight: newHeight, maxHeight: newHeight}
        setStyles(copy)
    }

    useEffect(() => {
        mainFlexHeightAdjustment();
    }, [])

    return (
        <Box sx={styles.mainFlex} ref={ref}>
            <Box sx={styles.mainBox}>
                <Box sx={styles.leftFlex}>
                    <Typography variant="h1"> 404 </Typography>
                    <Typography variant="h6"> Page not found </Typography>
                </Box>
                <Box sx={styles.rightFlex}>
                    <img src={toro} alt="logo" style={{width: "150px"}}/>
                </Box>
            </Box>
        </Box>
    );
};

export default ErrorPage;