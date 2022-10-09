import React from 'react';
import {Box, Card, CardActionArea} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const RecentTableCard = ({table, click}) => {

    const navigate = useNavigate();

    function handleClickTable() {
        click()
        navigate('/board/' + table.id);
    }

    return (
        <MenuItem sx={{display: "flex",alignItems:"center", width: "12vw", marginBottom:"10px", borderRadius:"10px"}} onClick={handleClickTable}>
                <Box sx={{display: "flex", alignItems:"center", width:"100%"}}>
                    <Box sx={{marginRight:"10px", width:"40%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img src={`data:image/jpeg;base64,${table.imagenTableroDto.foto}`} height="35px" style={{borderRadius:"10px"}}/>
                    </Box>
                    <Typography variant="subtitle1" sx={{width:"60%"}} noWrap>
                        {table.nombre}
                    </Typography>
                </Box>
        </MenuItem>
    );
};

export default RecentTableCard;