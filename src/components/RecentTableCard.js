import React, {useEffect, useState} from 'react';
import {Box, Card, CardActionArea} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const RecentTableCard = ({table, click}) => {

    const navigate = useNavigate();

    const [styles, setStyles] = useState({
        mainFlex: {
            display: "flex",
            width: "calc(100% - 2*15)",
            maxHeight: "calc(100% - 15px - 10px)", // 100 - paddingBottom - paddingTop - Navbar height
            minHeight: "calc(100% - 15px - 10px)"

        }
    })

    function handleClickTable() {
        click()
        navigate('/board/' + table.id);
    }

    useEffect(() => {
        setBackgroundImage(table)
    }, [table])

    const setBackgroundImage = (board) => {
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
        <MenuItem sx={{display: "flex",alignItems:"center", width: "250px", marginBottom:"10px", borderRadius:"10px"}} onClick={handleClickTable}>
                <Box sx={{display: "flex", alignItems:"center", width:"100%"}}>
                    <Box sx={{ width:"40%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img src={`data:image/jpeg;base64,${table.imagenTableroDto.foto}`} height="35px" width="60px" style={{borderRadius:"10px"}}/>
                    </Box>
                    <Typography variant="subtitle1" sx={{width:"60%"}} noWrap>
                        {table.nombre}
                    </Typography>
                </Box>
            {/*<Box sx={styles.mainFlex} />*/}
        </MenuItem>
    );
};

export default RecentTableCard;