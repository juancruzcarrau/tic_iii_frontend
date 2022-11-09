import React, {useEffect, useState} from 'react';
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
            borderRadius: "5px"
        }
    })

    function handleClickTable() {
        click()
        navigate('/board/' + table.id);
    }

    useEffect(() => {
        setBackgroundImage(table)
    }, [table])

    function setBackgroundImage(board) {
        let copy = styles;
        const imageUrl = `url(\"data:image/jpeg;base64,${board.imagenTableroDto.foto}\")`
        copy.mainFlex = {...copy.mainFlex,
            backgroundImage: imageUrl,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
        setStyles(copy)
    }

    return (
        <MenuItem disableGutters dense sx={{overflow: "hidden", display: "flex",alignItems:"center", width: "250px", marginBottom:"10px", borderRadius:"5px", height: "40px"}} onClick={handleClickTable}>
                {/*<Box sx={{display: "flex", alignItems:"center", width:"100%"}}>*/}
                {/*    <Box sx={{ width:"40%", display:"flex", alignItems:"center", justifyContent:"center"}}>*/}
                {/*        <img src={`data:image/jpeg;base64,${table.imagenTableroDto.foto}`} height="35px" width="60px" style={{borderRadius:"10px"}}/>*/}
                {/*    </Box>*/}
                {/*    <Typography variant="subtitle1" sx={{width:"60%"}} noWrap>*/}
                {/*        {table.nombre}*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            <Box sx={styles.mainFlex} />
            <Typography variant="subtitle1" sx={{width:"60%", paddingLeft: "10px"}} noWrap>
                {table.nombre}
            </Typography>
        </MenuItem>
    );
};

export default RecentTableCard;