import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box, Card, CardActionArea} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const RecentTableCard = ({table, click}) => {

    const navigate = useNavigate();

    const [styles, setStyles] = useState({
        mainFlex: {
            height: "40px",
            width: "65px",
            borderRadius: "5px",
            backgroundSize: "cover",
            backgroundPosition: "center"
        },
        image: {
            objectFit: "cover",
            height: "100%",
            width: "100%"
        }
    })

    function handleClickTable() {
        click()
        navigate('/board/' + table.id);
    }

    return (
        <MenuItem disableGutters dense sx={{overflow: "hidden", display: "flex",alignItems:"center", width: "250px", marginBottom:"10px", borderRadius:"5px", height: "40px"}} onClick={handleClickTable}>
            <Box sx={styles.mainFlex}>
                <img src={`data:image/jpeg;base64,${table.imagenTableroDto.foto}`} style={styles.image}/>
            </Box>
            <Typography variant="subtitle1" sx={{width:"60%", paddingLeft: "10px"}} noWrap>
                {table.nombre}
            </Typography>
        </MenuItem>
    );
};

export default RecentTableCard;